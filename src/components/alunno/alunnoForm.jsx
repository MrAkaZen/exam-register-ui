import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { alunnoApi } from '../../api/alunnoApi';

const schema = yup.object({
  nome: yup.string().min(2).required('Il nome è obbligatorio'),
  cognome: yup.string().min(2).required('Il cognome è obbligatorio'),
  password: yup.string().min(8).required('La password è obbligatoria'),
  email: yup.string().email('Email non valida').required('L\'email è obbligatoria'),
  telefono: yup.string().matches(/^\d{10}$/, 'Il numero di telefono deve essere di 10 cifre').notRequired(),
  dataNascita: yup.date().max(new Date(), 'La data di nascita deve essere nel passato').notRequired(),
  luogoNascita: yup.string().notRequired(),
  codiceFiscale: yup.string().matches(/^[A-Z0-9]{16}$/, 'Il codice fiscale deve essere di 16 caratteri alfanumerici').notRequired(),
  indirizzo: yup.string().notRequired(),
  cap: yup.string().matches(/^\d{5}$/, 'Il CAP deve essere di 5 cifre').notRequired(),
  citta: yup.string().notRequired(),
  annoCorso: yup.number().integer().min(1).max(10).notRequired(),
  dataIscrizione: yup.date().max(new Date(), 'La data di iscrizione deve essere nel passato').notRequired(),
});

export default function AlunnoForm({ onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await alunnoApi.save(data);
      console.log('Alunno creato:', response.data);
      onSuccess?.(response.data);
    } catch (error) {
      console.error('Errore:', error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-200">Nome</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Nome"
            {...register('nome')}
          />
          {errors.nome && <p className="text-xs text-rose-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Cognome</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Cognome"
            {...register('cognome')}
          />
          {errors.cognome && <p className="text-xs text-rose-400">{errors.cognome.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-200">Email</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Email"
            type="email"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Password</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-rose-400">{errors.password.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-200">Telefono</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Telefono"
            {...register('telefono')}
          />
          {errors.telefono && <p className="text-xs text-rose-400">{errors.telefono.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Data di nascita</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            type="date"
            {...register('dataNascita')}
          />
          {errors.dataNascita && <p className="text-xs text-rose-400">{errors.dataNascita.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-200">Data di iscrizione</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            type="date"
            {...register('dataIscrizione')}
          />
          {errors.dataIscrizione && <p className="text-xs text-rose-400">{errors.dataIscrizione.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Luogo di nascita</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Luogo di nascita"
            {...register('luogoNascita')}
          />
          {errors.luogoNascita && <p className="text-xs text-rose-400">{errors.luogoNascita.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Codice fiscale</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Codice fiscale"
            {...register('codiceFiscale')}
          />
          {errors.codiceFiscale && <p className="text-xs text-rose-400">{errors.codiceFiscale.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-200">Indirizzo</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Via e numero"
            {...register('indirizzo')}
          />
          {errors.indirizzo && <p className="text-xs text-rose-400">{errors.indirizzo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">CAP</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="CAP"
            {...register('cap')}
          />
          {errors.cap && <p className="text-xs text-rose-400">{errors.cap.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Città</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Città"
            {...register('citta')}
          />
          {errors.citta && <p className="text-xs text-rose-400">{errors.citta.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-200">Anno corso</label>
          <input
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Anno corso"
            type="number"
            {...register('annoCorso')}
          />
          {errors.annoCorso && <p className="text-xs text-rose-400">{errors.annoCorso.message}</p>}
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-indigo-500/20 transition hover:scale-[1.01]"
          >
            Aggiungi Alunno
          </button>
        </div>
      </div>
    </form>
  );
}