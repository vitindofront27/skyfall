const chart = document.querySelector('#chart');
const chartData = { 6: { labels:['Fev','Mar','Abr','Mai','Jun','Jul'], values:[36,52,46,69,63,87] }, 12: { labels:['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul'], values:[28,34,39,43,46,45,46,54,49,67,73,87] } };

function renderChart(period) {
  const { labels, values } = chartData[period];
  chart.innerHTML = values.map((value, index) => `<div class="bar"><i style="height:${value}%"></i><span>${labels[index]}</span></div>`).join('');
}
renderChart(6);
document.querySelector('#chartPeriod').addEventListener('change', event => renderChart(event.target.value));

const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }

document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('nav a').forEach(item => item.classList.remove('active')); link.classList.add('active'); }));
document.querySelector('#notificationButton').addEventListener('click', () => showToast('Você possui 3 alertas importantes.'));
document.querySelector('#addTool').addEventListener('click', () => showToast('O cadastro de ferramentas estará disponível em breve.'));
document.querySelectorAll('[data-message]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.message)));

const search = document.querySelector('#searchInput');
search.addEventListener('input', () => document.querySelectorAll('#toolsBody tr').forEach(row => { row.hidden = !row.textContent.toLowerCase().includes(search.value.toLowerCase()); }));
document.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); } });

