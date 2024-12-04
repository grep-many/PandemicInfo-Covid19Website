import React from 'react';
import './Contact.css'
import HeroSection from '../../components/HeroSection/HeroSection';


const Contact = () => {

  const { head, body } = {
    head: 'Get in Touch with Us',
    body: "If you have any questions or need assistance, don't hesitate to contact us. We're here to help!",
  }

  useEffect(() => {
    document.title = `PandemicInfo | Contact`;
    fetchData();
  }, []);

  return (
    <>
      <HeroSection head={head} body={body} />

      <section id="contact-form">
        <h2>Contact Form</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert('Static site') }}>
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" />
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
          </div>
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here"></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </>
  );
}

export default Contact;
