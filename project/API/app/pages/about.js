import React from "react";
import Layout from "../components/Layout";

function Pages({ title, component }) {
  return (
    <div className="bg-gray-100 p-4">
      <p className="wt-title">{title}</p>
      <div className="text-lg" dangerouslySetInnerHTML={{ __html: component }} />
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <Pages
        title="About Us"
        component={`
          <p>
            Welcome to our article social media platform, where words come to
            life and thoughts find their home. We are passionate about
            creating a space for individuals to express themselves, share
            ideas, and engage in meaningful discussions.
          </p>
         <br>
          <p>
            Our platform is built on the belief that everyone has a story to
            tell, and every perspective is valuable. Whether you're an
            experienced writer, a casual blogger, or someone looking to
            discover new voices, you'll find a community that embraces
            diversity and creativity.
          </p>
          <br>
          <p>
            Explore a vast array of articles covering various topics – from
            technology and science to art and lifestyle. Connect with fellow
            writers, readers, and thinkers who share your interests and
            passions.
          </p>
          <br>
          <p>
            Join us in fostering a culture of curiosity, learning, and
            connection. Let your words spark conversations, inspire others,
            and contribute to the rich tapestry of ideas that make our
            community thrive.
          </p>
        `}
      />
    </Layout>
  );
}
