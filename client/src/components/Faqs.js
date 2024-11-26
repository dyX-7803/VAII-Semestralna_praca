import React from 'react'


const Faqs = () => {
    return (
        <section class="bg-light py-3 py-md-5 footer">
        <div class="container">
          <div class="row gy-5 gy-lg-0 align-items-lg-center">
            <div class="col-12 col-lg-6">
              <img class="img-fluid rounded" loading="lazy" src="images/faq.png" alt="How can we help you?"/>
            </div>
            <div class="col-12 col-lg-6">
              <div class="row justify-content-xl-end">
                <div class="col-12 col-xl-11">
                  <h2 class="h1 mb-3">Ako vám môžeme pomôcť?</h2>
                  <p class="lead fs-4 text-secondary mb-5">Veríme, že tu nájdete odpovede na vaše otázky.</p>
                  <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Ako dlho trvá doručenie objednávky?
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>Štandardná doba doručenia je 3-5 pracovných dní, v závislosti od vašej polohy. Expresné doručenie je k dispozícii do 1-2 pracovných dní.</p>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Môžem tovar vrátiť alebo vymeniť?
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          Áno, ponúkame možnosť vrátenia alebo výmeny tovaru do 30 dní od doručenia. Tovar musí byť nepoužitý, s originálnymi štítkami a v pôvodnom obale. Pre viac informácií o vrátení si prečítajte naše podmienky v sekcii Vrátenie tovaru.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Môžem svoju objednávku zmeniť alebo zrušiť?
                        </button>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>Ak si prajete zmeniť alebo zrušiť svoju objednávku, kontaktujte nás čo najskôr po jej vytvorení. Ak už bola objednávka odoslaná, zmeny nebudú možné, ale môžete ju vrátiť po doručení.</p>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                          Aké sú možnosti dopravy?
                        </button>
                      </h2>
                      <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>Ponúkame viacero možností dopravy vrátane štandardnej, expresnej a doručenia do výdajného miesta. Pri pokladni si môžete vybrať spôsob dopravy, ktorý vám najviac vyhovuje.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
    );
}

export default Faqs;