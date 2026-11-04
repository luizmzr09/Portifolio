(() => {
  const app = document.querySelector('[data-program]');
  if (!app) return;
  const program = app.dataset.program;
  const output = document.getElementById('terminalOutput');
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const reset = document.getElementById('terminalReset');
  let state = {};
  const rates = [5.43, 0.005, 14.40, 6.70, 7.30, 6.20];
  const currencies = ['Dólar','Peso argentino','Dinar do Bahrein','Franco suíço','Libra esterlina','Euro'];
  function line(text='', cls='') { const div=document.createElement('div'); if(cls) div.className=cls; div.textContent=text; output.appendChild(div); output.scrollTop=output.scrollHeight; }
  function ask(prompt) { line(prompt); input.value=''; input.focus(); }
  function number(v) { return Number(String(v).replace(',','.')); }
  function money(v) { return Number(v).toFixed(2); }
  function start() {
    output.innerHTML=''; state={};
    if(program==='banco') { state.balance=1000; state.step='menu'; line('Banco tche tche --seu dinheiro com voce--'); bancoMenu(); }
    if(program==='conversor') { state.step='value'; ask('Digite o valor em reais: R$'); }
    if(program==='campeonato') { state.teams=[]; state.points=[]; state.wins=[]; state.goals=[]; state.scorers=[]; state.step='menu'; campeonatoMenu(); }
  }
  function bancoMenu(){ line('\n1-Consultar saldo\n2-Depositar\n3-Sacar\n4-Sair'); ask('Qual opcao deseja? '); state.step='bank-menu'; }
  function campeonatoMenu(){ line('\nCAMPEONATO DE FUTEBOL BRASILEIRO\n1-Registrar os times\n2-Zerar a pontuação, vitórias e gols\n3-Alternar pontos, gols e vitórias\n4-Alternar o nome de um artilheiro\n5-Informar time vencedor\n6-Informar o artilheiro com maior quantidade de gols\n7-Encerrar o programa'); ask('Digite qual opção deseja: '); state.step='champ-menu'; }
  function process(v) {
    if(program==='banco') {
      if(state.step==='bank-menu') { const op=number(v); if(op===1){line('Seu saldo e de: '+money(state.balance)); bancoMenu();} else if(op===2){state.step='deposit';ask('Quanto voce deseja depositar? ');} else if(op===3){state.step='withdraw';ask('Quanto deseja sacar? ');} else if(op===4){line('Banco fechado, vlw por confiar em nosso banco :)');state.step='ended';} else {line('Opcao nao definida!');bancoMenu();} }
      else if(state.step==='deposit'){const n=number(v);if(!Number.isFinite(n)||n<=0){line('Digite um valor válido e maior que zero.');ask('Quanto voce deseja depositar? ');return;}state.balance+=n;line(`Foi depositado ${money(n)}, agora o saldo e de: ${money(state.balance)}`);bancoMenu();}
      else if(state.step==='withdraw'){const n=number(v);if(!Number.isFinite(n)||n<=0){line('Digite um valor válido e maior que zero.');ask('Quanto deseja sacar? ');return;}state.balance-=n;line(`Foi sacado ${money(n)}, agora seu saldo e de: ${money(state.balance)}`);bancoMenu();}
      else line('Programa encerrado. Reinicie para executar novamente.');
    }
    if(program==='conversor') {
      if(state.step==='value'){const n=number(v);if(!Number.isFinite(n)||n<0){line('Informe um valor válido.');ask('Digite o valor em reais: R$');return;}if(n===0){line('Programa encerrado.');state.step='ended';return;}state.reais=n;line('\n1 - Dolar\n2 - Peso argentino\n3 - Dinar do Bahrein\n4 - Franco suico\n5 - Libra esterlina\n6 - Euro');ask('Escolha a moeda: ');state.step='currency';}
      else if(state.step==='currency'){const op=number(v);if(!Number.isInteger(op)||op<1||op>6){line('Opção inválida. Escolha um número de 1 a 6.');ask('Escolha a moeda: ');return;}line(`A pessoa recebera ${money(state.reais/rates[op-1])} ${currencies[op-1]}`);state.step='value';ask('\nDigite o valor em reais: R$');}
      else line('Programa encerrado. Reinicie para executar novamente.');
    }
    if(program==='campeonato') {
      if(state.step==='champ-menu'){const op=number(v);if(op===1){state.teams=[];state.step='team-code';state.index=0;ask('Digite o código do time 1: ');}else if(op===2){state.points=Array(5).fill(0);state.wins=Array(5).fill(0);state.goals=Array(5).fill(0);line('Os dados foram zerados!');campeonatoMenu();}else if(op===3){state.step='update-code';ask('Digite o código do time: ');}else if(op===4){state.step='scorer-code';ask('Digite o código do time: ');}else if(op===5){if(!state.teams.length){line('Cadastre os times primeiro.');}else{let i=state.points.indexOf(Math.max(...state.points));line('O CAMPEÃO DO CAMPEONATO DE FUTEBOL BRASILEIRO\nTime: '+state.teams[i].name+'\nArtilheiro: '+(state.scorers[i]||'Não informado')+'\nPontos: '+(state.points[i]||0));}campeonatoMenu();}else if(op===6){if(!state.teams.length){line('Cadastre os times primeiro.');}else{let i=state.goals.indexOf(Math.max(...state.goals));line('ARTILHEIRO QUE FEZ MAIS GOLS\nArtilheiro: '+(state.scorers[i]||'Não informado'));}campeonatoMenu();}else if(op===7){line('Programa encerrado!');state.step='ended';}else{line('Não é uma opção!');campeonatoMenu();}}
      else if(state.step==='team-code'){const n=number(v);if(!Number.isInteger(n)){line('Digite um código numérico.');ask('Digite o código do time: ');return;}state.pendingCode=n;state.step='team-name';ask('Digite o nome do time: ');}
      else if(state.step==='team-name'){state.teams.push({code:state.pendingCode,name:v});state.index++;if(state.index<5){state.step='team-code';ask(`Digite o código do time ${state.index+1}: `);}else{state.points=Array(5).fill(0);state.wins=Array(5).fill(0);state.goals=Array(5).fill(0);state.scorers=Array(5).fill('');line('Times registrados!');campeonatoMenu();}}
      else if(state.step==='update-code'){const i=state.teams.findIndex(t=>t.code===number(v));if(i<0){line('O time não foi encontrado!');campeonatoMenu();return;}state.index=i;state.step='points';ask('Digite a quantidade de pontos: ');}
      else if(state.step==='points'){state.points[state.index]=number(v)||0;state.step='wins';ask('Digite a quantidade de vitórias: ');}
      else if(state.step==='wins'){state.wins[state.index]=number(v)||0;state.step='goals';ask('Digite a quantidade de gols: ');}
      else if(state.step==='goals'){state.goals[state.index]=number(v)||0;line('Os dados foram alternados!');campeonatoMenu();}
      else if(state.step==='scorer-code'){const i=state.teams.findIndex(t=>t.code===number(v));if(i<0){line('O time não foi encontrado!');campeonatoMenu();return;}state.index=i;state.step='scorer-name';ask('Digite o nome do artilheiro: ');}
      else if(state.step==='scorer-name'){state.scorers[state.index]=v;line('Os nomes foram alterados!');campeonatoMenu();}
      else line('Programa encerrado. Reinicie para executar novamente.');
    }
  }
  form.addEventListener('submit',e=>{e.preventDefault();const v=input.value.trim();if(!v)return;line('> '+v,'terminal-user');process(v);});
  reset.addEventListener('click',start);
  start();
})();
