template(lang="pug")
footer.footer
.container
.footer-grid
.footer-section
h3 Politikalarımız
ul
li
router-link(to="/hizmet-kosullari") Hizmet Koşulları
li
router-link(to="/gizlilik-politikasi") Gizlilik Politikası
li
router-link(to="/kargo-politikasi") Kargo Politikası
li
router-link(to="/iade-politikasi") İade Politikası
li
router-link(to="/iletisim") İletişim

.footer-section
h3 Site Haritası
ul
li
router-link(to="/") Ana Sayfa
li
router-link(to="/kahve-fali") Kahve Falı
li
router-link(to="/burclar") Burçlar
li
router-link(to="/ne-anlama-gelir") Ne Anlama Gelir?
li
router-link(to="/magaza") Mağaza

.footer-section.newsletter
h3 Mail Bültenimize Abone Ol
p Abone ol ve kampanyalarımızdan haberdar ol!
form.newsletter-form(@submit.prevent="handleSubscribe")
input(
type="email"
v-model="email"
placeholder="E-posta adresiniz"
required
)
button.btn-subscribe(type="submit")
i.fas.fa-envelope
| Abone Ol

.footer-section.payment-methods
h3 Ödeme Yöntemleri
.payment-icons
i.fab.fa-cc-visa
i.fab.fa-cc-mastercard
i.fab.fa-cc-amex
i.fab.fa-apple-pay
i.fab.fa-google-pay

.footer-bottom
p.copyright
| Copyright © {{ new Date().getFullYear() }} Fal Periniz. Tüm hakları saklıdır.
.social-links
a(href="#" target="_blank" rel="noopener noreferrer")
i.fab.fa-instagram
a(href="#" target="_blank" rel="noopener noreferrer")
i.fab.fa-facebook
a(href="#" target="_blank" rel="noopener noreferrer")
i.fab.fa-twitter

script(setup lang="ts")
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
// TODO: Implement newsletter subscription logic
console.log('Subscribe:', email.value)
email.value = ''
}

style(lang="scss" scoped)
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

.footer {
background: $dark-gradient;
padding: 4rem 0 2rem;
margin-top: 4rem;
@include glass-morphism;

.container {
max-width: $desktop;
margin: 0 auto;
padding: 0 2rem;
}
}

.footer-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 2rem;
margin-bottom: 3rem;
}

.footer-section {
h3 {
font-size: 1.2rem;
margin-bottom: 1.5rem;
color: $secondary;
@include text-gradient;
}

ul {
list-style: none;
padding: 0;

li {
margin-bottom: 0.8rem;

a {
color: $text-secondary;
transition: $transition-normal;

&:hover {
color: $secondary;
text-decoration: none;
}
}
}
}
}

.newsletter-form {
display: flex;
gap: 1rem;
margin-top: 1rem;

input {
flex: 1;
padding: 0.8rem 1rem;
border: 1px solid rgba($white, 0.1);
border-radius: $radius-md;
background: rgba($white, 0.05);
color: $text-primary;
@include glass-morphism;

&::placeholder {
color: $text-muted;
}
}

.btn-subscribe {
padding: 0.8rem 1.5rem;
border: none;
border-radius: $radius-md;
background: $primary-gradient;
color: $white;
cursor: pointer;
transition: $transition-normal;
@include button-hover;

i {
margin-right: 0.5rem;
}
}
}

.payment-icons {
display: flex;
gap: 1rem;
font-size: 2rem;
color: $text-muted;

i {
transition: $transition-normal;

&:hover {
color: $secondary;
}
}
}

.footer-bottom {
display: flex;
justify-content: space-between;
align-items: center;
padding-top: 2rem;
border-top: 1px solid rgba($white, 0.1);

.copyright {
color: $text-muted;
font-size: 0.9rem;
}

.social-links {
display: flex;
gap: 1rem;

a {
color: $text-muted;
font-size: 1.5rem;
transition: $transition-normal;

&:hover {
color: $secondary;
}
}
}
}

@include responsive(mobile) {
.footer {
padding: 3rem 0 1.5rem;
}

.footer-grid {
grid-template-columns: 1fr;
gap: 2rem;
}

.newsletter-form {
flex-direction: column;
}

.footer-bottom {
flex-direction: column;
text-align: center;
gap: 1rem;
}
}
</style>
