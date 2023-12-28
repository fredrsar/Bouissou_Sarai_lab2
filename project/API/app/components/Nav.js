import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex justify-center">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            HOME
          </Link>
        </li>
        
        <li>
          <Link href="/about">
            ABOUT US
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            CONTACT US
          </Link>
        </li>
        
        <li>
          <Link href="/articlesDisplayingPage">
            ARTICLE BROWSER
          </Link>
        </li>
        
        
        <li>
          <Link href="/articleCreationPage">
            WRITE YOUR ARTICLE
          </Link>
        </li>
      </ul>
    </div>
  );
}
