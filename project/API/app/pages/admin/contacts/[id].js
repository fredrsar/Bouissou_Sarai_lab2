import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const ContactId = ({ contact }) => {
  return (
    <div>
      <h1>Contact Details Page</h1>
      <p>Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const supabase = useSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', params.id)
      .single(); 

    return {
      props: {
        contact: data,
      },
    };
  } catch (error) {
    console.error('Error fetching contact details:', error.message);
    return {
      notFound: true,
    };
  }
}

export default ContactId;
