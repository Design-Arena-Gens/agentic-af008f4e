'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { generatePlan, StrategyInput, StrategyPlan } from "@/lib/strategy";

const initialForm: StrategyInput = {
  companyName: "Agence Convaincante",
  offering: "une solution d'automatisation des ventes omnicanal",
  audience: "les dirigeants de PME du e-commerce",
  pains: "Perte de temps à relancer manuellement\nFaible taux de conversion sur WhatsApp\nClients hésitants au téléphone",
  differentiators:
    "Scripts personnalisés basés sur la psychologie d'achat\nSuivi automatisé des relances par canal\nCoaching rapide de vos équipes commerciales",
  proofPoints:
    "70% d'augmentation du taux de réponse WhatsApp\n+45% de ventes conclues au téléphone en 30 jours",
  incentive: "on offre une session de cadrage stratégique si vous démarrez ce mois-ci",
  nextStep: "bloquons un créneau de 20 minutes mardi ou jeudi",
  tone: "chaleureux"
};

export default function HomePage() {
  const [form, setForm] = useState<StrategyInput>(initialForm);
  const [plan, setPlan] = useState<StrategyPlan>(() => generatePlan(initialForm));

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlan(generatePlan(form));
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Impossible de copier le contenu", error);
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <h1>Agent de persuasion WhatsApp & Appels</h1>
        <p>
          Décrivez votre offre et obtenez en un clic un script WhatsApp, un plan de relance
          téléphonique et des réponses aux objections pour convertir vos prospects.
        </p>
      </section>

      <div className="layout">
        <form className="card form" onSubmit={handleSubmit}>
          <h2>1. Paramétrer votre agent</h2>
          <p className="helper">
            Plus vous êtes précis, plus les messages seront personnalisés. Utilisez des retours
            terrain, chiffres clés, objections entendues.
          </p>

          <label>
            <span>Nom de votre entreprise</span>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Proposition de valeur principale</span>
            <input
              type="text"
              name="offering"
              value={form.offering}
              onChange={handleChange}
              placeholder="Quelle offre souhaitez-vous promouvoir ?"
              required
            />
          </label>

          <label>
            <span>Client cible</span>
            <input
              type="text"
              name="audience"
              value={form.audience}
              onChange={handleChange}
              placeholder="Ex: Directeurs commerciaux retail, entrepreneurs solopreneurs…"
              required
            />
          </label>

          <label>
            <span>Douleurs et blocages rencontrés</span>
            <textarea
              name="pains"
              value={form.pains}
              onChange={handleChange}
              rows={4}
              placeholder="Chaque point sur une nouvelle ligne"
            />
          </label>

          <label>
            <span>Différenciateurs clés</span>
            <textarea
              name="differentiators"
              value={form.differentiators}
              onChange={handleChange}
              rows={4}
              placeholder="Ce qui vous rend unique, vus du client"
            />
          </label>

          <label>
            <span>Preuves & résultats</span>
            <textarea
              name="proofPoints"
              value={form.proofPoints}
              onChange={handleChange}
              rows={3}
              placeholder="Témoignages, chiffres clés, références clients"
            />
          </label>

          <label>
            <span>Offre ou bonus</span>
            <input
              type="text"
              name="incentive"
              value={form.incentive}
              onChange={handleChange}
              placeholder="Ex: audit offert, -15% avant dimanche…"
            />
          </label>

          <label>
            <span>Prochaine étape souhaitée</span>
            <input
              type="text"
              name="nextStep"
              value={form.nextStep}
              onChange={handleChange}
              placeholder="Ex: Fixer un appel jeudi 11h, répondre à ce message…"
            />
          </label>

          <label>
            <span>Tonalité</span>
            <select name="tone" value={form.tone} onChange={handleChange}>
              <option value="chaleureux">Chaleureuse & empathique</option>
              <option value="expert">Expert & rassurante</option>
              <option value="pressant">Directe & urgente</option>
            </select>
          </label>

          <button type="submit" className="primary">
            Générer le plan de persuasion
          </button>
        </form>

        <section className="card results">
          <h2>2. Scripts prêts à l'emploi</h2>
          <p className="helper">
            Copiez, adaptez si besoin et envoyez immédiatement vos messages ou scripts d'appel.
          </p>

          <article className="result-block">
            <header>
              <h3>Positionnement clair</h3>
            </header>
            <p className="persona">{plan.personaSnapshot}</p>
            <ul>
              {plan.keyAngles.map((angle) => (
                <li key={angle}>{angle}</li>
              ))}
            </ul>
          </article>

          <article className="result-block">
            <header className="result-header">
              <h3>Message WhatsApp</h3>
              <button
                type="button"
                className="ghost"
                onClick={() =>
                  handleCopy(
                    [plan.whatsapp.headline, ...plan.whatsapp.paragraphs, plan.whatsapp.callToAction].join(
                      "\n\n"
                    )
                  )
                }
              >
                Copier
              </button>
            </header>
            <div className="message">
              <strong>{plan.whatsapp.headline}</strong>
              {plan.whatsapp.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p className="cta">{plan.whatsapp.callToAction}</p>
            </div>
          </article>

          <article className="result-block">
            <header className="result-header">
              <h3>Scénario d'appel</h3>
              <button
                type="button"
                className="ghost"
                onClick={() =>
                  handleCopy(
                    [
                      `Introduction : ${plan.callScript.introduction}`,
                      `Découverte :\n- ${plan.callScript.discovery.join("\n- ")}`,
                      `Argumentaire :\n- ${plan.callScript.pitch.join("\n- ")}`,
                      `Clôture :\n- ${plan.callScript.closing.join("\n- ")}`
                    ].join("\n\n")
                  )
                }
              >
                Copier
              </button>
            </header>
            <div className="call-script">
              <h4>Introduction</h4>
              <p>{plan.callScript.introduction}</p>

              <h4>Questions de découverte</h4>
              <ul>
                {plan.callScript.discovery.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>

              <h4>Argumentaire</h4>
              <ul>
                {plan.callScript.pitch.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <h4>Clôture</h4>
              <ul>
                {plan.callScript.closing.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="result-block">
            <header>
              <h3>Objections & réponses</h3>
            </header>
            <ul>
              {plan.objections.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.response}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="result-block">
            <header>
              <h3>Plan de suivi</h3>
            </header>
            <ol>
              {plan.followUp.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </article>
        </section>
      </div>
    </main>
  );
}
