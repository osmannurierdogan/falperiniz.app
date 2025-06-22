<template lang="pug">
.home(role="main" aria-label="Ana Sayfa")
  //- Hero Section
  .hero(role="banner")
    .container
      .hero-content
        h1(role="heading" aria-level="1")
          span.gradient-text Fal Periniz
          | ile Geleceğe Bakın
        p.hero-description(role="text") Yapay zeka teknolojisi ile rüyalarınızı yorumlayın ve kahve falınıza bakın. Bilinçaltınızdaki mesajları keşfedin.
        .button-group
          router-link.btn.btn-primary(to="/dream" role="button" aria-label="Hemen Başla")
            span.icon-wrapper
              span Hemen Başla
              ArrowRightIcon
          router-link.btn.btn-outline(to="/about" role="button" aria-label="Keşfet") Keşfet

      .hero-image(aria-hidden="true")
        .card-3d
          .mystical-symbols
            svg(viewBox="0 0 400 400")
              //- Merkez Daire ve Semboller
              circle(cx="200" cy="200" r="100")
              path(d="M200 100 L200 300 M100 200 L300 200")
              //- Dekoratif Eğriler
              path(d="M120 120 Q200 150 280 120")
              path(d="M120 280 Q200 250 280 280")
              //- Yıldızlar
              path(d="M150 150 L155 140 L160 150 L150 155 Z")
              path(d="M240 150 L245 140 L250 150 L240 155 Z")
              path(d="M150 250 L155 240 L160 250 L150 255 Z")
              path(d="M240 250 L245 240 L250 250 L240 255 Z")
              //- Ay ve Güneş
              path(d="M180 160 A20 20 0 0 1 180 200")
              circle(cx="220" cy="180" r="15")
              path(d="M220 160 L220 200 M200 180 L240 180")

  //- Features Section
  section.features(role="region" aria-label="Hizmetlerimiz")
    .container
      .section-header
        h2(role="heading" aria-level="2").gradient-text Hizmetlerimiz
        p.section-description Modern yapay zeka teknolojisi ile size özel yorumlar

      .features-grid
        //- Rüya Yorumu Kartı
        router-link.feature-card(
          to="/dream-interpretation"
          role="article"
          aria-label="Rüya Yorumu Hizmeti"
          style="--card-index: 0"
        )
          .icon-wrapper
            span.icon(aria-hidden="true") 🌙
          h3 Rüya Yorumu
          p Rüyalarınızı yapay zeka ile analiz edin ve bilinçaltınızdaki mesajları keşfedin
          .card-footer
            span.learn-more Hemen Yorumla
            span.arrow(aria-hidden="true") →

        //- Kahve Falı Kartı
        router-link.feature-card(
          to="/coffee-reading"
          role="article"
          aria-label="Kahve Falı Hizmeti"
          style="--card-index: 1"
        )
          .icon-wrapper
            span.icon(aria-hidden="true") ☕️
          h3 Kahve Falı
          p Fincanınızın fotoğrafını yükleyin, yapay zeka sizin için yorumlasın
          .card-footer
            span.learn-more Fal Baktır
            span.arrow(aria-hidden="true") →

  //- Why Us Section
  section.why-us(role="region" aria-label="Neden Fal Periniz?")
    .container
      .section-header
        h2(role="heading" aria-level="2").gradient-text Neden Fal Periniz?
        p.section-description En son teknoloji ile güvenilir ve kişisel yorumlar

      .features-grid
        article.feature-card(style="--card-index: 0")
          .icon-wrapper
            span.icon(aria-hidden="true") 🤖
          h3.gradient-text GPT-4 Teknolojisi
          p.feature-description En gelişmiş yapay zeka ile detaylı ve anlamlı yorumlar
          ul.feature-list(role="list")
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Derin Analiz
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Kişiselleştirilmiş Yorumlar
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Anlık Sonuçlar

        article.feature-card(style="--card-index: 1")
          .icon-wrapper
            span.icon(aria-hidden="true") 🔒
          h3.gradient-text Güvenli ve Özel
          p.feature-description Verileriniz ve yorumlarınız tamamen size özel
          ul.feature-list(role="list")
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Uçtan Uca Şifreleme
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | KVKK Uyumlu
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Güvenli Depolama

        article.feature-card(style="--card-index: 2")
          .icon-wrapper
            span.icon(aria-hidden="true") ⚡️
          h3.gradient-text Kesintisiz Hizmet
          p.feature-description 7/24 dilediğiniz yerden erişim
          ul.feature-list(role="list")
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Anında Yanıt
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Mobil Uyumlu
            li(role="listitem")
              span.check(aria-hidden="true") ✓
              | Sürekli Destek

  //- Testimonials Section
  section.testimonials(role="region" aria-label="Kullanıcı Deneyimleri")
    .container
      .section-header
        h2(role="heading" aria-level="2").gradient-text Kullanıcı Deneyimleri
        //- p.section-description Kullanıcılarımızın yorumlarının yanı sıra yapay zeka teknolojisi ile yorumlanan rüyalarınızı da keşfedin.

      .testimonials-grid
        article.testimonial-card(
          role="article"
          aria-label="Ayşe Y.'nin Yorumu"
          style="--card-index: 0"
        )
          .user-info
            .avatar(aria-hidden="true") AY
            .details
              .name Ayşe Y.
              .location İstanbul
          p "Rüya yorumları inanılmaz detaylı ve anlamlı. Her detayı düşünülmüş harika bir uygulama!"
          .rating(aria-label="5 yıldız üzerinden 5 yıldız")
            - var n = 0
            while n < 5
              span(style=`--star-index: ${n}` aria-hidden="true") ★
              - n++

        article.testimonial-card(
          role="article"
          aria-label="Mehmet K.'nin Yorumu"
          style="--card-index: 1"
        )
          .user-info
            .avatar(aria-hidden="true") MK
            .details
              .name Mehmet K.
              .location Ankara
          p "Kahve falı yorumları çok isabetli. Yapay zeka teknolojisi gerçekten etkileyici."
          .rating(aria-label="5 yıldız üzerinden 5 yıldız")
            - var n = 0
            while n < 5
              span(style=`--star-index: ${n}` aria-hidden="true") ★
              - n++

        article.testimonial-card(
          role="article"
          aria-label="Zeynep A.'nın Yorumu"
          style="--card-index: 2"
        )
          .user-info
            .avatar(aria-hidden="true") ZA
            .details
              .name Zeynep A.
              .location İzmir
          p "Kullanımı çok kolay ve yorumlar anında geliyor. Kesinlikle tavsiye ediyorum!"
          .rating(aria-label="5 yıldız üzerinden 5 yıldız")
            - var n = 0
            while n < 5
              span(style=`--star-index: ${n}` aria-hidden="true") ★
              - n++

  //- CTA Section
  section.cta(role="region" aria-label="Üyelik Çağrısı")
    .container
      .cta-card
        h2(role="heading" aria-level="2") Geleceğinizi Keşfedin
        p Hemen başlayın ve yapay zeka destekli yorumları almaya başlayın
        .button-group
          router-link.btn.btn-primary(
            to="/dream"
            role="button"
            aria-label="Rüya Yorumu"
          ) Rüya Yorumu
          router-link.btn.btn-outline(
            to="/coffee"
            role="button"
            aria-label="Kahve Falı"
          ) Kahve Falı
</template>
<style lang="scss" scoped>
@import '@/assets/scss/_variables';
@import '@/assets/scss/_mixins';

.home {
  min-height: 100vh;
  background: linear-gradient(135deg, $primary, darken($accent, 20%));
  color: $white;
  overflow-x: hidden;
  position: relative;

  &::before {
    content: '';
    position: fixed; // Scroll performansı için fixed
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-header h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
}

// Hero Section
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 4rem 0;

  .hero-content {
    max-width: 600px;
    opacity: 0;
    animation: fadeInUp 1s ease forwards;

    h1 {
      font-size: clamp(2.5rem, 5vw, 4.5rem); // Responsive font size
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;

      .gradient-text {
        background: linear-gradient(45deg, $secondary, $accent);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: block;
        position: relative;
        margin-bottom: 2.4rem;

        &::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100px;
          height: 4px;
          background: linear-gradient(45deg, $secondary, $accent);
          border-radius: 2px;
        }
      }
    }

    p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      line-height: 1.8;
      margin-bottom: 3rem;
      opacity: 0.9;
    }

    .button-group {
      display: flex;
      gap: 1.5rem;

      .btn {
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1.125rem;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        @include button-hover;

        &.btn-primary {
          background: linear-gradient(45deg, $secondary, $accent);
          border: none;
          @include neon-glow($secondary);

          &:hover {
            transform: translateY(-3px);
            @include neon-glow(lighten($secondary, 10%));
          }
        }

        &.btn-outline {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.2);
          @include glass-morphism;

          &:hover {
            border-color: $secondary;
            transform: translateY(-3px);
            @include neon-glow($accent);
          }
        }

        .icon {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        &:hover .icon {
          transform: translateX(5px);
        }
      }
    }
  }

  .hero-image {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 50%;
    @include floating;
    opacity: 0;
    animation: fadeIn 1s ease 0.5s forwards;

    .card-3d {
      position: relative;
      width: 100%;
      padding-bottom: 140%;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, rgba($secondary, 0.2), rgba($accent, 0.2));
        border-radius: 30px;
        @include glass-morphism;
        transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
        @include neon-glow($accent);
        transition: transform 0.5s ease;
      }

      &:hover::before {
        transform: perspective(1000px) rotateY(-5deg) rotateX(10deg);
      }

      .mystical-symbols {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 80%;
          height: 80%;
          stroke: rgba(255, 255, 255, 0.6);
          stroke-width: 2;
          fill: none;

          circle,
          path {
            transition: all 0.3s ease;
          }

          &:hover {
            circle {
              stroke: rgba(255, 255, 255, 0.8);
              stroke-width: 3;
            }

            path {
              stroke: rgba(255, 255, 255, 0.8);
              stroke-width: 3;
            }
          }
        }
      }
    }
  }
}

// Features Section
.features {
  padding: 8rem 0;
  position: relative;
  background: rgba($primary, 0.7);

  .section-header {
    text-align: center;
    // margin-bottom: 5rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease forwards;

    h2 {
      //font-size: clamp(2rem, 4vw, 3rem);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin-bottom: 1.5rem;
      background: linear-gradient(45deg, $secondary, $accent);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    padding: 2rem;

    .feature-card {
      @include glass-morphism;
      border-radius: 20px;
      padding: 2.5rem;
      transition: all 0.3s ease;
      text-decoration: none;
      color: $white;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 1s ease forwards;
      animation-delay: calc(var(--card-index) * 0.2s);

      &:hover {
        transform: translateY(-10px);
        @include neon-glow($secondary);

        .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }
      }

      .icon-wrapper {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: linear-gradient(45deg, $secondary, $accent);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        transition: all 0.3s ease;
        @include neon-glow($accent);

        .icon {
          font-size: 2.5rem;
          animation: pulse 2s ease-in-out infinite;
        }
      }

      h3 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.125rem;
        line-height: 1.7;
        opacity: 0.9;
        margin-bottom: 1.5rem;
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .learn-more {
          font-weight: 600;
          color: $secondary;
          transition: color 0.3s ease;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        &:hover {
          .learn-more {
            color: lighten($secondary, 10%);
          }

          .arrow {
            transform: translateX(5px);
          }
        }
      }
    }
  }
}

// Why Us Section
.why-us {
  padding: 8rem 0;
  background: $bg-primary;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: $glow-gradient;
    opacity: $glass-opacity;
    pointer-events: none;
    backdrop-filter: blur($glass-blur);
    -webkit-backdrop-filter: blur($glass-blur);
  }

  .section-header {
    text-align: center;
    margin-bottom: 5rem;
    position: relative;

    h2 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin-bottom: 1.5rem;
      @include text-gradient;
      text-shadow: $text-shadow;
    }

    p {
      font-size: clamp(1.1rem, 2vw, 1.25rem);
      color: $text-secondary;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    padding: 2rem;

    .feature-card {
      background: $bg-card;
      border-radius: $radius-lg;
      padding: 2.5rem;
      transition: all $transition-normal;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur($glass-blur);
      -webkit-backdrop-filter: blur($glass-blur);
      border: 1px solid rgba($white, $glass-opacity);

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: $glow-gradient;
        opacity: 0;
        transition: opacity $transition-normal;
      }

      &:hover {
        transform: translateY($hover-lift) scale($hover-scale);
        border-color: rgba($secondary, 0.3);
        box-shadow: $hover-shadow;

        &::before {
          opacity: 0.15;
        }

        .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 25px rgba($secondary, 0.4);

          .icon {
            transform: scale(1.1);
          }
        }

        h3 {
          transform: translateY(-2px);
        }
      }

      .icon-wrapper {
        width: 64px;
        height: 64px;
        background: $bg-gradient;
        border-radius: $radius-md;
        @include flex-center;
        margin-bottom: 2rem;
        transition: all $transition-normal;
        position: relative;
        box-shadow: 0 4px 15px rgba($accent, 0.3);

        .icon {
          font-size: 2rem;
          transition: transform $transition-normal;
          filter: drop-shadow(0 2px 4px rgba($black, 0.2));
        }
      }

      h3 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 1rem;
        @include text-gradient;
        transition: transform $transition-normal;
      }

      .feature-description {
        font-size: 1.1rem;
        color: $text-secondary;
        margin-bottom: 2rem;
        line-height: 1.6;
      }

      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          color: $text-secondary;
          font-size: 1.1rem;
          transition: transform $transition-normal;

          &:hover {
            transform: translateX(5px);

            .check {
              color: $secondary;
              transform: scale(1.1);
            }
          }

          .check {
            color: $secondary-light;
            font-weight: bold;
            transition: all $transition-normal;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

// Testimonials Section
.testimonials {
  padding: 8rem 0;
  background: rgba($primary, 0.3);

  .section-header {
    h2 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      text-align: center;
    }
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;

    .testimonial-card {
      @include glass-morphism;
      border-radius: 20px;
      padding: 2.5rem;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 1s ease forwards;
      animation-delay: calc(var(--card-index) * 0.2s);

      &:hover {
        transform: translateY(-5px);
        @include neon-glow($accent);

        .avatar {
          transform: scale(1.1) rotate(5deg);
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          background: linear-gradient(45deg, $secondary, $accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
          margin-right: 1rem;
          @include neon-glow($secondary);
          transition: all 0.3s ease;
        }

        .details {
          .name {
            font-weight: 600;
            font-size: 1.25rem;
            margin-bottom: 0.25rem;
          }

          .location {
            opacity: 0.7;
            font-size: 0.875rem;
          }
        }
      }

      p {
        font-size: 1.125rem;
        line-height: 1.7;
        margin-bottom: 1.5rem;
        font-style: italic;
        position: relative;

        &::before {
          content: '"';
          font-size: 4rem;
          position: absolute;
          top: -1rem;
          left: -1rem;
          opacity: 0.2;
          font-family: serif;
        }
      }

      .rating {
        color: #FFD700;
        font-size: 1.25rem;
        display: flex;
        gap: 0.25rem;

        span {
          animation: pulse 2s ease-in-out infinite;
          animation-delay: calc(var(--star-index) * 0.1s);
        }
      }
    }
  }
}

// CTA Section
.cta {
  padding: 8rem 0;

  .cta-card {
    @include glass-morphism;
    border-radius: 30px;
    padding: 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    @include neon-glow($secondary);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease forwards;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, rgba($secondary, 0.1), rgba($accent, 0.1));
      z-index: -1;
    }

    h2 {
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 1.5rem;
      background: linear-gradient(45deg, $secondary, $accent);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto 2.5rem;
    }

    .button-group {
      display: flex;
      gap: 1.5rem;
      justify-content: center;

      .btn {
        @extend .btn;
      }
    }
  }
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
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

// Responsive Design
@media (max-width: 1200px) {
  .hero {
    .hero-image {
      width: 45%;
    }
  }
}

@media (max-width: 992px) {
  .hero {
    .hero-content {
      h1 {
        font-size: 3.5rem;
      }
    }

    .hero-image {
      position: relative;
      width: 100%;
      right: 0;
      top: 0;
      transform: none;
      margin-top: 3rem;
    }
  }

  .cta-card {
    padding: 3rem;

    h2 {
      font-size: 2.5rem;
    }
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  .hero {
    padding: 6rem 0;
    text-align: center;

    .hero-content {
      h1 {
        font-size: 3rem;

        .gradient-text::after {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .button-group {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .features-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .cta {
    padding: 4rem 0;

    .cta-card {
      padding: 2rem;

      .button-group {
        flex-direction: column;
        align-items: stretch;
      }
    }
  }
}

@media (max-width: $tablet) {
  .why-us {
    padding: 6rem 0;

    .features-grid {
      grid-template-columns: 1fr;
      padding: 1rem;
    }
  }
}

@media (max-width: $mobile) {
  .why-us {
    padding: 4rem 0;

    .section-header {
      margin-bottom: 3rem;
    }

    .features-grid {
      gap: 1.5rem;
      padding: 0.5rem;

      .feature-card {
        padding: 2rem;
      }
    }
  }
}
</style>

<script setup>
import { ArrowRightIcon, HomeIcon } from '@heroicons/vue/24/solid'
</script>
