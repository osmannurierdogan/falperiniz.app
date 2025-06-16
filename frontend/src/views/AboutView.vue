<template lang="pug">
.about-view
  .container
    .about-header
      h1.gradient-text Fal Periniz Hakkında
      p.subtitle Kahve falı ve burçlara dair her şey...

    .about-content
      .mission-section
        h2 Misyonumuz
        p Fal Periniz olarak, modern teknolojiyi geleneksel fal kültürüyle birleştirerek, sizlere benzersiz bir deneyim sunuyoruz. Uzman falcılarımız ve yapay zeka teknolojimiz ile kahve falı, burç yorumları ve tarot falı hizmetlerimizi güvenilir ve profesyonel bir şekilde sunmaktayız.

      .services-section
        h2 Hizmetlerimiz
        .services-grid
          .service-card
            i.fas.fa-coffee
            h3 Kahve Falı
            p Uzman falcılarımız ve yapay zeka teknolojimiz ile detaylı kahve falı yorumları

          .service-card
            i.fas.fa-star
            h3 Burç Yorumları
            p Günlük, haftalık ve aylık burç yorumları ile astrolojik rehberlik

          .service-card
            i.fas.fa-cards
            h3 Tarot Falı
            p Profesyonel tarot okuyucularımız ile geleceğe ışık tutun

      .values-section
        h2 Değerlerimiz
        ul.values-list
          li
            h3 Güvenilirlik
            p Her yorumumuzda ve hizmetimizde dürüstlük ve şeffaflık

          li
            h3 Profesyonellik
            p Uzman kadromuz ile kaliteli ve profesyonel hizmet

          li
            h3 Gizlilik
            p Kullanıcı bilgilerinizin ve yorumlarınızın tam güvenliği

          li
            h3 İnovasyon
            p Modern teknoloji ile geleneksel fal kültürünün harmanlanması

      .contact-section
        h2 İletişim
        .contact-info
          p
            i.fas.fa-envelope
            span falperinizcom+shopify@gmail.com
          p
            i.fas.fa-phone
            span +90 545 122 41 70
</template>

<style lang="scss" scoped>
.about-view {
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-soft) 100%);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .about-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease forwards;

    .gradient-text {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.2rem;
      color: var(--color-text-soft);
    }
  }

  .about-content {
    section {
      margin-bottom: 4rem;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 1s ease forwards;
      animation-delay: 0.3s;
    }

    h2 {
      font-size: 2rem;
      color: var(--color-heading);
      margin-bottom: 2rem;
      text-align: center;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    .service-card {
      background: var(--color-background-mute);
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      i {
        font-size: 2.5rem;
        color: var(--color-primary);
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--color-heading);
      }

      p {
        color: var(--color-text-soft);
      }
    }
  }

  .values-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    list-style: none;
    padding: 0;

    li {
      text-align: center;

      h3 {
        font-size: 1.3rem;
        color: var(--color-heading);
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--color-text-soft);
      }
    }
  }

  .contact-section {
    text-align: center;

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      margin-top: 2rem;

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text);

        i {
          color: var(--color-primary);
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .about-view {
    padding: 2rem 0;

    .about-header {
      margin-bottom: 2rem;
    }

    .about-content {
      section {
        margin-bottom: 2rem;
      }
    }

    .services-grid,
    .values-list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
