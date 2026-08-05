const chartCanvas = document.getElementById('expensesChart');
const chartPeriod = document.getElementById('chartPeriod');

const periods = {
  6: {
    labels: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    data: [720, 850, 790, 1080, 1185, 1284]
  },
  12: {
    labels: ['Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    data: [530, 590, 620, 680, 710, 720, 720, 850, 790, 1080, 1185, 1284]
  }
};

const chartContext = chartCanvas.getContext('2d');

const gradient = chartContext.createLinearGradient(0, 0, 0, 280);
gradient.addColorStop(0, 'rgba(120, 97, 255, .34)');
gradient.addColorStop(1, 'rgba(120, 97, 255, 0)');

const expensesChart = new Chart(chartContext, {
  type: 'line',

  data: {
    labels: periods[6].labels,
    datasets: [
      {
        data: periods[6].data,
        borderColor: '#8b7cff',
        backgroundColor: gradient,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#f4f0ff',
        pointHoverBorderColor: '#897dff',
        pointHoverBorderWidth: 3,
        tension: 0.42,
        fill: true
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        backgroundColor: '#14172b',
        borderColor: '#37345d',
        borderWidth: 1,
        titleColor: '#f7f5ff',
        bodyColor: '#bab9cf',
        padding: 12,
        displayColors: false,

        callbacks: {
          label: context =>
            ` R$ ${context.raw.toLocaleString('pt-BR', {
              minimumFractionDigits: 2
            })}`
        }
      }
    },

    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          color: '#738096',
          font: {
            size: 11,
            family: 'DM Sans'
          }
        }
      },

      y: {
        beginAtZero: true,
        suggestedMax: 1500,

        grid: {
          color: 'rgba(154, 173, 205, .09)'
        },

        border: {
          display: false
        },

        ticks: {
          color: '#738096',

          font: {
            size: 10,
            family: 'DM Sans'
          },

          callback: value =>
            `R$ ${value >= 1000 ? `${value / 1000}k` : value}`
        }
      }
    }
  }
});

chartPeriod.addEventListener('change', () => {
  const period = periods[chartPeriod.value];

  expensesChart.data.labels = period.labels;
  expensesChart.data.datasets[0].data = period.data;
  expensesChart.update();
});

const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.querySelectorAll('[data-toast]').forEach(button => {
  button.addEventListener('click', () => {
    showToast(button.dataset.toast);
  });
});

document.getElementById('addTool').addEventListener('click', () => {
  showToast('Conexão de ferramenta iniciada.');
});

document.getElementById('notificationButton').addEventListener('click', () => {
  showToast('Você possui 3 alertas importantes.');
});

const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  document.querySelectorAll('#toolsBody tr').forEach(row => {
    row.hidden = !row.textContent
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
  });
});

document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

const sidebar = document.getElementById('sidebar');

document.getElementById('menuToggle').addEventListener('click', event => {
  const isOpen = sidebar.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', isOpen);
});

document.getElementById('themeButton').addEventListener('click', () => {
  document.body.classList.toggle('soft-mode');

  showToast(
    document.body.classList.contains('soft-mode')
      ? 'Contraste suave ativado.'
      : 'Contraste padrão ativado.'
  );
});
