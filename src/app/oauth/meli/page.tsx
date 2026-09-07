import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autorização do Mercado Livre',
  robots: { index: false, follow: false },
};

/**
 * Página de retorno do login do Mercado Livre.
 *
 * Só existe porque o Meli exige uma redirect_uri https e fixa. Ela não fala
 * com a API nem guarda nada: mostra o `code` na tela pro Alisson copiar e
 * trocar por token na máquina dele, onde o client_secret mora.
 */
export default function AutorizacaoDoMeli({
  searchParams,
}: {
  searchParams: { code?: string; error?: string; error_description?: string };
}) {
  const { code, error, error_description } = searchParams;

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Autorização do Mercado Livre</h1>

      {code && (
        <>
          <p className="mb-3 text-slate-300">Copie o código abaixo e rode na sua máquina:</p>
          <pre className="mb-4 overflow-x-auto rounded bg-slate-950 p-4 text-sm text-green-400">
            {code}
          </pre>
          <pre className="overflow-x-auto rounded bg-slate-950 p-4 text-sm text-slate-300">
            npm run meli:autorizar -- {code}
          </pre>
          <p className="mt-4 text-sm text-slate-400">
            O código vale poucos minutos e serve uma vez só. Se demorar, é só refazer o login.
          </p>
        </>
      )}

      {error && (
        <div className="rounded bg-red-950 p-4">
          <p className="font-semibold text-red-300">O Meli recusou: {error}</p>
          {error_description && <p className="mt-2 text-sm text-red-200">{error_description}</p>}
        </div>
      )}

      {!code && !error && (
        <p className="text-slate-300">
          Esta página é o retorno do login do Mercado Livre. Chegando aqui sem código, é porque o
          fluxo não começou — abra a URL de autorização primeiro.
        </p>
      )}
    </main>
  );
}
