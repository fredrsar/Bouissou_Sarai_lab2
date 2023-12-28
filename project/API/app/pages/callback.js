import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const checkGitHubLoginStatus = async () => {
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
      });

      if (user) {
        console.log('GitHub Login Successful:', user);
        router.push('/profile');
      } else {
        console.error('GitHub Login Error:', error);
        router.push('/');
      }
    };

    checkGitHubLoginStatus();
  }, [router]);

  return <div>Processing GitHub Callback...</div>;
};

export default Callback;
