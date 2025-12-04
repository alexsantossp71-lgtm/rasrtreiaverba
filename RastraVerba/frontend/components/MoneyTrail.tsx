'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Dep. Paulo Alexandre (R$ 1.5M)' },
        position: { x: 250, y: 25 },
        style: { background: '#1e293b', color: '#fff', border: '1px solid #475569', borderRadius: '8px', width: 200 }
    },
    {
        id: '2',
        data: { label: 'Município de Santos/SP' },
        position: { x: 250, y: 150 },
        style: { background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', width: 200 }
    },
    {
        id: '3',
        data: { label: 'Licitação 045/2024' },
        position: { x: 250, y: 275 },
        style: { background: '#334155', color: '#fff', border: '1px dashed #94a3b8', borderRadius: '8px', width: 200 }
    },
    {
        id: '4',
        type: 'output',
        data: { label: 'Construtora Exemplo LTDA (CNPJ: XX.XXX...)' },
        position: { x: 250, y: 400 },
        style: { background: '#14532d', color: '#fff', border: '1px solid #22c55e', borderRadius: '8px', width: 250 }
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Transferência Especial' },
    { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Homologação' },
    { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Contrato' },
];

export default function MoneyTrail() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="bottom-right"
            >
                <Controls style={{ fill: '#fff' }} />
                <MiniMap style={{ height: 120 }} zoomable pannable />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
}
