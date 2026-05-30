import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Save } from 'lucide-react';
import { materiaApi } from '../../api/materiaApi';

const schema = yup.object({
  nome:        yup.string().min(2, 'Minimo 2 caratteri').required('Il nome è obbligatorio'),
  codice:      yup.string().notRequired(),
  cfu:         yup.number().integer().min(1).max(30).notRequired().typeError('Inserisci un numero'),
  descrizione: yup.string().notRequired(),
  docente:     yup.string().notRequired(),
  semestre:    yup.number().integer().min(1).max(2).notRequired().typeError('Inserisci 1 o 2'),
});

export default function MateriaForm({ onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const response = await materiaApi.save(data);
      onSuccess?.(response.data);
      reset();
    } catch (err) {
      console.error('Errore salvataggio materia:', err.response?.data?.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="er-form">
      <div className="er-form-row er-form-row--2">
        <div className="er-field">
          <label className="er-label" htmlFor="mat-nome">Nome materia *</label>
          <input id="mat-nome" className={`er-input${errors.nome ? ' er-input--error' : ''}`} placeholder="Es. Analisi Matematica" {...register('nome')} />
          {errors.nome && <p className="er-error">{errors.nome.message}</p>}
        </div>
        <div className="er-field">
          <label className="er-label" htmlFor="mat-codice">Codice</label>
          <input id="mat-codice" className="er-input" placeholder="Es. MAT-01" {...register('codice')} />
        </div>
      </div>

      <div className="er-form-row er-form-row--2">
        <div className="er-field">
          <label className="er-label" htmlFor="mat-docente">Docente</label>
          <input id="mat-docente" className="er-input" placeholder="Es. Prof. Rossi" {...register('docente')} />
        </div>
        <div className="er-form-row er-form-row--2" style={{ gap: 10 }}>
          <div className="er-field">
            <label className="er-label" htmlFor="mat-cfu">CFU</label>
            <input id="mat-cfu" type="number" min={1} max={30} className={`er-input${errors.cfu ? ' er-input--error' : ''}`} placeholder="6" {...register('cfu')} />
            {errors.cfu && <p className="er-error">{errors.cfu.message}</p>}
          </div>
          <div className="er-field">
            <label className="er-label" htmlFor="mat-sem">Semestre</label>
            <input id="mat-sem" type="number" min={1} max={2} className={`er-input${errors.semestre ? ' er-input--error' : ''}`} placeholder="1" {...register('semestre')} />
            {errors.semestre && <p className="er-error">{errors.semestre.message}</p>}
          </div>
        </div>
      </div>

      <div className="er-field">
        <label className="er-label" htmlFor="mat-desc">Descrizione</label>
        <input id="mat-desc" className="er-input" placeholder="Breve descrizione del corso" {...register('descrizione')} />
      </div>

      <button type="submit" className="er-btn er-btn--primary" disabled={isSubmitting} style={{ alignSelf: 'flex-start' }}>
        <Save size={14} strokeWidth={2} />
        {isSubmitting ? 'Salvataggio…' : 'Aggiungi materia'}
      </button>
    </form>
  );
}
