import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Layout from '../../components/Layout';

const ContactsPage = () => {
  const supabase = useSupabaseClient();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, error } = await supabase
          .from('contacts')
          .select('*');

        if (error) {
          console.error('Error fetching contacts:', error.message);
        } else {
          setContacts(data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
      }
    };

    fetchContacts();
  }, [supabase]);

  return (
    <Layout>
      <div className="mt-4">
        <h1>Contact List</h1>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              firstname : {contact.firstname} - lastname : {contact.lastname} - email{contact.email}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default ContactsPage;
