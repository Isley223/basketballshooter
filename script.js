document.addEventListener('DOMContentLoaded', () => {
  const soundBtn = document.getElementById('soundBtn');
  const soundIcon = document.getElementById('soundIcon');
  const infoBtn = document.getElementById('infoBtn');
  const infoModal = document.getElementById('infoModal');
  const defenderToggle = document.getElementById('defenderToggle');

  window.toggleInfoModal = function () {
    infoModal?.classList.toggle('hidden');
  };

  window.toggleDefenderMode = function (enabled) {
    if (defenderToggle) defenderToggle.checked = Boolean(enabled);
  };

  window.switchGameMode = function (mode) {
    const modeMap = {
      blitz: '60s Blitz',
      ft: 'FT Shootout',
      defender: 'Defender Challenge',
      practice: 'Free Practice'
    };

    const currentModeLabel = document.getElementById('currentModeLabel');
    if (currentModeLabel) currentModeLabel.textContent = modeMap[mode] ?? '60s Blitz';

    const modeButtons = [
      document.getElementById('modeBlitz'),
      document.getElementById('modeFT'),
      document.getElementById('modeDefend'),
      document.getElementById('modePractice')
    ];

    modeButtons.forEach((button) => {
      if (!button) return;
      const isActive = button.id === `mode${mode.charAt(0).toUpperCase() + mode.slice(1)}` ||
        (mode === 'blitz' && button.id === 'modeBlitz');
      button.className = isActive
        ? 'px-3 py-1.5 rounded-lg font-semibold transition bg-amber-500 text-slate-950 shadow-md'
        : 'px-3 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white transition';
    });
  };

  soundBtn?.addEventListener('click', () => {
    const isEnabled = soundIcon?.classList.contains('text-red-400') === false;
    soundIcon.className = isEnabled
      ? 'fa-solid fa-volume-xmark text-lg text-red-400'
      : 'fa-solid fa-volume-high text-lg';
  });

  infoBtn?.addEventListener('click', () => window.toggleInfoModal());
  defenderToggle?.addEventListener('change', (event) => window.toggleDefenderMode(event.target.checked));
});
