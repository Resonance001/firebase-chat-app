import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getUsers, UsersCollection } from '@/lib/firebase-service';

export const useFetchUsers = (searchText?: string) => {
    const [users, setUsers] = useState<UsersCollection[]>([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersList = await getUsers(searchText);
            const filteredUsers = usersList.filter(
                (d: UsersCollection) => d.uid != user?.uid
            );

            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, fetchUsers };
};
