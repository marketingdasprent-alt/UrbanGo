import { navigate } from '../router'

export function Privacy() {
  const updated = '19 de maio de 2026'

  return (
    <main>
      <section className="legal-hero">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Início</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Privacidade</span>
        </nav>
        <p className="eyebrow center">Documento legal</p>
        <h1 className="title legal-title">
          Política de <span className="title-accent">Privacidade</span>
        </h1>
        <p className="subtitle legal-subtitle">
          Como tratamos os seus dados pessoais ao utilizar o site da UrbanGo
          e os nossos serviços enquanto operadora TVDE em Portugal.
        </p>
        <p className="legal-updated">Última atualização: {updated}</p>
      </section>

      <section className="section legal">
        <article className="legal-content">
          <h2>1. Responsável pelo tratamento</h2>
          <p>
            A presente Política de Privacidade aplica-se ao tratamento de dados
            pessoais realizado pela <strong>UrbanGo</strong>, operadora TVDE
            licenciada pelo IMT, com sede na R. do Mourato n.º 70A, 9600-224
            Ribeira Grande, Portugal. Pode contactar-nos para qualquer questão
            relativa à proteção de dados através do email{' '}
            <a href="mailto:geral@urbango.pt">geral@urbango.pt</a>.
          </p>

          <h2>2. Dados que recolhemos</h2>
          <p>
            Recolhemos apenas os dados estritamente necessários para a prestação
            dos nossos serviços e para o cumprimento das nossas obrigações
            legais. Em concreto:
          </p>
          <ul>
            <li><strong>Dados de contacto:</strong> nome, email, número de telemóvel.</li>
            <li><strong>Dados profissionais:</strong> certificado TVDE, carta de condução, IBAN para faturação.</li>
            <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, páginas visitadas e cookies (ver <a href="/cookies" onClick={(e) => { e.preventDefault(); navigate('/cookies') }}>Política de Cookies</a>).</li>
            <li><strong>Comunicações:</strong> registos de email, telefone ou formulários submetidos no nosso site.</li>
          </ul>

          <h2>3. Finalidades e fundamento</h2>
          <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
          <ul>
            <li>Gestão da candidatura, contratação e relação com motoristas TVDE.</li>
            <li>Cumprimento de obrigações legais, fiscais e regulatórias (IMT, Autoridade Tributária).</li>
            <li>Comunicação de novidades, slots disponíveis e informação operacional.</li>
            <li>Melhoria da experiência no site e segurança das nossas plataformas.</li>
          </ul>
          <p>
            O fundamento de licitude é o consentimento, a execução de contrato,
            o cumprimento de obrigação legal ou o interesse legítimo da UrbanGo,
            consoante a finalidade em causa.
          </p>

          <h2>4. Prazo de conservação</h2>
          <p>
            Os dados são conservados pelo tempo necessário ao cumprimento da
            finalidade que justificou a sua recolha e, em qualquer caso, pelos
            períodos legais aplicáveis (designadamente 10 anos para efeitos
            fiscais e contabilísticos).
          </p>

          <h2>5. Partilha com terceiros</h2>
          <p>
            A UrbanGo não vende dados pessoais. Os dados podem ser comunicados
            a entidades subcontratadas que atuam por nossa conta (alojamento,
            email, faturação, plataformas Uber e Bolt) e a autoridades públicas,
            quando legalmente exigido.
          </p>

          <h2>6. Direitos do titular</h2>
          <p>
            Pode, a qualquer momento, exercer os seus direitos de acesso,
            retificação, apagamento, limitação, portabilidade e oposição ao
            tratamento, bem como retirar o consentimento previamente prestado.
            Para tal, basta contactar-nos por email para{' '}
            <a href="mailto:geral@urbango.pt">geral@urbango.pt</a>.
          </p>
          <p>
            Tem ainda o direito de apresentar reclamação à Comissão Nacional de
            Proteção de Dados (CNPD) em <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">cnpd.pt</a>.
          </p>

          <h2>7. Segurança</h2>
          <p>
            Aplicamos medidas técnicas e organizativas adequadas para proteger
            os dados pessoais contra perda, acesso não autorizado ou destruição
            indevida, em conformidade com o RGPD.
          </p>

          <h2>8. Alterações a esta política</h2>
          <p>
            Esta política pode ser atualizada a qualquer momento. A versão em
            vigor está sempre disponível neste endereço, com indicação da data
            da última atualização.
          </p>

          <div className="legal-cta">
            <p>Tem dúvidas sobre o tratamento dos seus dados?</p>
            <a href="mailto:geral@urbango.pt" className="legal-cta-btn">
              Falar com a UrbanGo
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}
