import { useEffect, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    useEffect(() => {
        setItems(props.initialData);
    }, [props.initialData]);

    const sortedItems = [...items].sort((a, b) => {
        return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const handleNameClick = (id: number, name: string) => {
        setEditingId(id);
        setEditValue(name);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setItems(
                items.map((item) =>
                    item.id === editingId ? { ...item, name: editValue } : item,
                ),
            );
            setEditingId(null);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            <button onClick={() => {}}></button>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {sortedItems.map((item) => (
                    <li key={item.id}>
                        {editingId === item.id ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                data-testid="edit-input"
                            />
                        ) : (
                            <span
                                onClick={() =>
                                    handleNameClick(item.id, item.name)
                                }
                                style={{ cursor: 'pointer' }}
                            >
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
