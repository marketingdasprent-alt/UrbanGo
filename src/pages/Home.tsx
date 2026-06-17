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
          Mobilidade e logística <br />
          <span className="title-accent">à medida de Portugal.</span>
        </h1>
        <p className="subtitle">
          A UrbanGo é uma operadora de mobilidade em Portugal. Disponibilizamos
          viaturas TVDE para motoristas Uber e Bolt, serviços de entrega
          expresso e aluguer de viaturas ligeiras de passageiros e comerciais.
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
              <button type="submit">Pedir orçamento</button>
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
              Uma operadora de mobilidade feita por quem conhece a estrada.
            </h2>
          </div>
          <div className="section-body">
            <p>
              A UrbanGo é uma operadora licenciada que combina três áreas
              complementares de mobilidade e logística: TVDE, entrega expresso
              e aluguer de viaturas ligeiras de passageiros e comerciais.
            </p>
            <p>
              Servimos motoristas que querem trabalhar nas plataformas Uber
              e Bolt, empresas que precisam de entregas rápidas e fiáveis, e
              particulares ou empresas que procuram aluguer flexível — tudo
              com a mesma exigência de serviço.
            </p>
          </div>
        </div>
      </section>

      <section id="servicos" className="section section--alt">
        <p className="eyebrow center">Serviços</p>
        <h2 className="section-title center">O que fazemos por si</h2>
        <ul className="cards">
          <li className="card">
            <FeatureIcon type="tvde" />
            <h3>Viaturas TVDE</h3>
            <p>
              Viaturas aprovadas pela Uber e Bolt, com seguro, manutenção e
              inspeção incluídos. Slots flexíveis para motoristas começarem
              a trabalhar no mesmo dia.
            </p>
          </li>
          <li className="card">
            <FeatureIcon type="delivery" />
            <h3>Entrega expresso</h3>
            <p>
              Recolha e entrega rápida na sua área. Documentos, encomendas e
              cargas urgentes — entregues com prova de entrega e
              acompanhamento em tempo real.
            </p>
          </li>
          <li className="card">
            <FeatureIcon type="car" />
            <h3>Aluguer de viaturas</h3>
            <p>
              Aluguer de viaturas ligeiras de passageiros e comerciais. Diário,
              semanal ou mensal, com seguro e assistência incluídos —
              ideal para particulares e empresas.
            </p>
          </li>
        </ul>
      </section>

      <section id="como-funciona" className="section">
        <p className="eyebrow center">Como funciona</p>
        <h2 className="section-title center">Simples e direto ao ponto</h2>
        <ul className="features">
          <li>
            <FeatureIcon type="route" />
            <div>
              <h3>1. Diga-nos o que precisa</h3>
              <p>Viatura TVDE, entrega expresso ou aluguer — fale connosco com o seu pedido.</p>
            </div>
          </li>
          <li>
            <FeatureIcon type="price" />
            <div>
              <h3>2. Receba o seu orçamento</h3>
              <p>Apresentamos a melhor opção, com preços transparentes e sem custos surpresa.</p>
            </div>
          </li>
          <li>
            <FeatureIcon type="clock" />
            <div>
              <h3>3. Comece já</h3>
              <p>Levante a viatura, agende a entrega ou comece a faturar no mesmo dia.</p>
            </div>
          </li>
          <li>
            <FeatureIcon type="shield" />
            <div>
              <h3>Apoio 7 dias por semana</h3>
              <p>Equipa disponível para qualquer dúvida, imprevisto ou pedido urgente.</p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  )
}
