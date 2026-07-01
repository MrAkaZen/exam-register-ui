import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import alunnoApi from '../../api/alunnoApi';

const schema = yup.object({
  nome:          yup.string().min(2).required('Il nome è obbligatorio'),
  cognome:       yup.string().min(2).required('Il cognome è obbligatorio'),
  password:      yup.string().min(8).required('La password è obbligatoria'),
  email:         yup.string().email('Email non valida').required("L'email è obbligatoria"),
  telefono:      yup.string().matches(/^\d{10}$/, 'Deve essere di 10 cifre').notRequired(),
  dataNascita:   yup.date().max(new Date(), 'Deve essere nel passato').notRequired(),
  luogoNascita:  yup.string().notRequired(),
  codiceFiscale: yup.string().matches(/^[A-Z0-9]{16}$/, '16 caratteri alfanumerici').notRequired(),
  indirizzo:     yup.string().notRequired(),
  cap:           yup.string().matches(/^\d{5}$/, 'CAP di 5 cifre').notRequired(),
  citta:         yup.string().notRequired(),
  annoCorso:     yup.number().integer().min(1).max(10).notRequired(),
});

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.06em' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize: 11.5, color: 'var(--danger)', marginTop: 4 }}>{error.message}</p>}
    </div>
  );
}

export default function AlunnoForm({ onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await alunnoApi.save(data);
      onSuccess?.(response.data);
      reset();
    } catch (err) {
      console.error('Errore:', err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Nome" error={errors.nome}>
          <input className="er-input" placeholder="Nome" {...register('nome')} />
        </Field>
        <Field label="Cognome" error={errors.cognome}>
          <input className="er-input" placeholder="Cognome" {...register('cognome')} />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <input className="er-input" placeholder="email@dominio.it" type="email" {...register('email')} />
      </Field>

      <Field label="Password" error={errors.password}>
        <input className="er-input" placeholder="Min. 8 caratteri" type="password" {...register('password')} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Telefono" error={errors.telefono}>
          <input className="er-input" placeholder="3391234567" {...register('telefono')} />
        </Field>
        <Field label="Data di nascita" error={errors.dataNascita}>
          <input className="er-input" type="date" {...register('dataNascita')} />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Luogo nascita" error={errors.luogoNascita}>
          <input className="er-input" placeholder="Città" {...register('luogoNascita')} />
        </Field>
        <Field label="Codice fiscale" error={errors.codiceFiscale}>
          <input className="er-input" placeholder="RSSMRA85M01H501Z" {...register('codiceFiscale')} />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        <Field label="Indirizzo" error={errors.indirizzo}>
          <input className="er-input" placeholder="Via e numero" {...register('indirizzo')} />
        </Field>
        <Field label="CAP" error={errors.cap}>
          <input className="er-input" placeholder="00100" {...register('cap')} />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Città" error={errors.citta}>
          <input className="er-input" placeholder="Città" {...register('citta')} />
        </Field>
        <Field label="Anno corso" error={errors.annoCorso}>
          <input className="er-input" placeholder="1" type="number" min="1" max="10" {...register('annoCorso')} />
        </Field>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button type="submit" className="er-btn er-btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 13.5 }} disabled={isSubmitting}>
          {isSubmitting ? 'Salvataggio...' : '+ Aggiungi alunno'}
        </button>
      </div>
    </form>
  );
}
