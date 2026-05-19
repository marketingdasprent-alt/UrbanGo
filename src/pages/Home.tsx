import { useState } from 'react'
import { FeatureIcon } from '../components/FeatureIcon'

export function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <main>
      <section id="top" className="hero">
        <span className="status-pill">
          <span className="status-dot" /> Site em construção
        </span>

        <h1 className="title">
          Viaturas TVDE para <br />
          <span className="title-accent">quem quer trabalhar.</span>
        </h1>
        <p className="subtitle">
          A UrbanGo é o novo operador TVDE em Portugal.
          Estamos a preparar uma forma mais rápida,
          mais próxima e mais segura de circular pela cidade.
        </p>

        <form id="contacto" className="signup" onSubmit={onSubmit}>
          {!submitted ? (
            <>
              <input
                type="email"
                placeholder="O seu email ou telemóvel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email ou telemóvel"
              />
              <button type="submit">Quero uma viatura</button>
            </>
          ) : (
            <div className="signup-success">
              Recebemos o seu contacto. Falamos consigo em breve.
            </div>
          )}
        </form>
      </section>

      <section id="sobre" className="section">
        <div className="section-grid">
          <div>
            <p className="eyebrow">Sobre nós</p>
            <h2 className="section-title">
              Uma operadora TVDE feita por quem conhece a estrada.
            </h2>
          </div>
          <div className="section-body">
            <p>
              A UrbanGo é uma operadora TVDE licenciada que disponibiliza
              viaturas a motoristas profissionais em Portugal. Trabalhamos
              como ponte entre o motorista e as principais plataformas do
              mercado — Uber e Bolt — para que se concentre apenas no que
              faz melhor: conduzir.
            </p>
            <p>
              Cuidamos da viatura, dos seguros, das inspeções e da gestão
              administrativa. O motorista escolhe o slot que melhor se
              ajusta à sua disponibilidade e começa a trabalhar.
            </p>
          </div>
        </div>
      </section>

      <section id="frota" className="section section--alt">
        <p className="eyebrow center">Frota</p>
        <h2 className="section-title center">Viaturas prontas a trabalhar</h2>
        <ul className="cards">
          <li className="card">
            <FeatureIcon type="city" />
            <h3>Viaturas elegíveis</h3>
            <p>Modelos aprovados pela Uber e Bolt, recentes, com baixa quilometragem e em ótimo estado.</p>
          </li>
          <li className="card">
            <FeatureIcon type="shield" />
            <h3>Tudo incluído</h3>
            <p>Seguro, manutenção, IUC, inspeção e assistência em viagem — sem custos surpresa.</p>
          </li>
          <li className="card">
            <FeatureIcon type="business" />
            <h3>Slots flexíveis</h3>
            <p>Turnos diurnos, noturnos ou 24h. Adapte-se ao seu ritmo e ao que dá mais retorno.</p>
          </li>
        </ul>
      </section>

      <section id="como-funciona" className="section">
        <p className="eyebrow center">Como funciona</p>
        <h2 className="section-title center">Comece em 3 passos</h2>
        <ul className="features">
          <li>
            <FeatureIcon type="route" />
            <div>
              <h3>1. Candidate-se</h3>
              <p>Envie os seus dados e certificado TVDE. Validamos a sua candidatura em 24h.</p>
            </div>
          </li>
          <li>
            <FeatureIcon type="business" />
            <div>
              <h3>2. Escolha o seu slot</h3>
              <p>Selecione a viatura e o turno que melhor se ajustam ao seu objetivo de rendimento.</p>
            </div>
          </li>
          <li>
            <FeatureIcon type="price" />
            <div>
              <h3>3. Comece a faturar</h3>
              <p>Levante a viatura, ligue-se à Uber/Bolt e comece já no mesmo dia a trabalhar.</p>
            </div>
          </li>
          <li>
            <FeatureIcon type="clock" />
            <div>
              <h3>Apoio sempre</h3>
              <p>Equipa disponível 7 dias por semana para qualquer dúvida ou imprevisto.</p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  )
}
