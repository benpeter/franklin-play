const BEREICHE_REST_API = '/bereiche.json';

async function fetchBereiche() {
  const url = new URL(window.location);

  try {
    const resp = await fetch(`${url.origin}${BEREICHE_REST_API}`);
    const json = await resp.json();
    return json.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`unable to fetch vip areas ${e}`);
  }
  return [];
}

function bereichElement(area) {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${area.url}">
      <div class="info">
        <h3>${area.bereich}</h3>
        <p>Gegründet: ${area.gruendungsjahr}</p>
        <p>Wir gewinnen ${area.element}</p>
      </div>
    </a>
  `;
  return li;
}

export default async function decorate(block) {
    const bereiche = await fetchBereiche();
    const ul = document.createElement('ul');
  
    bereiche.map(bereichElement)
      .forEach((li) => ul.appendChild(li));
    block.append(ul);
  }