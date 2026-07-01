import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit — à remplacer par un appel API réel
    setSubmitted(true);
  };

  return (
    <section className="py-20" id="contact">
      <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="mb-2.5 block text-[0.8rem] font-bold uppercase tracking-wide text-accent-hover">
            Une question ?
          </span>
          <h2 className="mb-3.5 text-[clamp(1.5rem,2.2vw,1.85rem)]">
            Contactez l&apos;équipe UniHub DZ
          </h2>
          <p className="max-w-[420px] text-[0.98rem] text-text">
            Vous représentez un club ou une université et souhaitez publier
            vos événements sur la plateforme ? Écrivez-nous.
          </p>
        </div>

        <Card padding="lg">
          {submitted ? (
            <div className="flex flex-col items-center gap-2.5 py-5 text-center text-[0.95rem] font-semibold text-accent-hover">
              <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
              <p>
                Merci, votre message a bien été envoyé. Nous reviendrons vers
                vous rapidement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                label="Nom complet"
                name="name"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Adresse e-mail"
                type="email"
                name="email"
                placeholder="vous@exemple.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Message"
                as="textarea"
                name="message"
                placeholder="Votre message..."
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="primary" fullWidth>
                Envoyer le message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
};

export default Contact;