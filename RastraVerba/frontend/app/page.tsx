'use client';

import React, { useState } from 'react';
import MoneyTrail from '../components/MoneyTrail';
import { Search } from 'lucide-react';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        // Simulação de busca
        setTimeout(() => setIsSearching(false), 1000);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-8 bg-slate-950 text-slate-100">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    RastraVerba&nbsp;
                    <code className="font-mono font-bold">v1.0</code>
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                        Transparência em Emendas Pix
                    </span>
                </div>
            </div>

            <div className="w-full max-w-3xl mb-12">
                <form onSubmit={handleSearch} className="relative flex items-center">
                    <Search className="absolute left-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por Deputado, Município ou CNPJ..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                        {isSearching ? 'Rastreando...' : 'Rastrear'}
                    </button>
                </form>
            </div>

            <div className="w-full max-w-6xl h-[600px] border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm relative">
                <div className="absolute top-4 left-4 z-10 bg-slate-900/80 p-2 rounded border border-slate-700">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Caminho do Dinheiro</h3>
                </div>
                <MoneyTrail />
            </div>

            <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-12 gap-6">
                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Origem{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Identificação do parlamentar autor da emenda e valor original.
                    </p>
                </div>

                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Execução{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Cruzamento com Diários Oficiais para encontrar licitações locais.
                    </p>
                </div>

                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Destino{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Identificação da empresa final (CNPJ) beneficiária do recurso.
                    </p>
                </div>
            </div>
        </main>
    );
}
