const url = document.title.includes('Senate') ?
        'senate' :
        'house'

let init = {
        headers: {
                'X-API-Key': 'dqY75AHbRFeTKF2GollgVVhkoaDqFugKlZLv7zQy'
        }
}

// PROMESA ES UNA RESPUESTA DE UNA OPERACION ASINCRONICA
// PROMETE QUE ALGO VA A SUCEDER
// METODO .JSON LA RESPUESTA A ESA PROMESA HACE QUE SE LA API SEA ANALIZADA Y TE DEVUELVE EL ARCHIVO TIPO JSON

fetch(`https://api.propublica.org/congress/v1/113/${url}/members.json`, init)
        .then(res => res.json())
        .then(json => {

                data(json.results[0].members)
        })
        .catch(err => console.log(err.message))

const data = (members => {
    
    if (document.title == "DIG | Home") {
        let button = document.getElementById('button')
        button.addEventListener('click', (e) => {
            button.innerText = button.innerText == 'Read More' ? 'Read Less' : 'Read More'
        })
    
    } else {
    
        if (document.title == "DIG | House" || document.title == "DIG | Senate") {
    
            const tableSenate = document.getElementById("body-table");
    
            var nombresMostrados = []
            var filtroEstado = "todos"
            var filtroParty = ["D", "ID", "R"]
            var nombresFinales = []
    
            function leerFiltros() {
                if (filtroEstado === "todos") {
                    nombresMostrados = members
    
                } else {
                    nombresMostrados = members.filter(member => member.state === filtroEstado)
                }
    
                nombresFinales = []
                nombresMostrados.forEach(member => {
                    let party = member.party
                    if (party === "D" && filtroParty.includes("D")) {
                        nombresFinales.push(member)
                    } else if (party === "ID" && filtroParty.includes("ID")) {
                        nombresFinales.push(member)
                    } else if (party === "R" && filtroParty.includes("R")) {
                        nombresFinales.push(member)
                    }
                })
            }
            agregarNuevaPersona()
       
            function agregarNuevaPersona() {
                document.getElementById('body-table').innerHTML = ''
                leerFiltros()
                nombresFinales.forEach(member => {
    
                    let fila = document.createElement('tr');

                    let celda1 = document.createElement('td');
                    let celda2 = document.createElement('td');
                    let celda3 = document.createElement('td');
                    let celda4 = document.createElement('td');
                    let celda5 = document.createElement('td');
                    let nombres = `${member.last_name} ${member.first_name || member.middle_name}`
                    celda1.innerHTML = nombres.link(member.url)
                    celda2.innerText = member.party
                    celda3.innerText = member.state
                    celda4.innerText = member.seniority
                    celda5.innerText = `${member.votes_with_party_pct} ${"%"}`
    
                    fila.appendChild(celda1)
                    fila.appendChild(celda2)
                    fila.appendChild(celda3)
                    fila.appendChild(celda4)
                    fila.appendChild(celda5)
    
                    tableSenate.appendChild(fila);
                });
            }
              
            var checkbox = document.querySelectorAll("input[type='checkbox']");
            checkbox = Array.from(checkbox)
            checkbox.forEach(ch => {
                ch.addEventListener('change', (e) => {
                    let queInput = e.target.value
                    let estaChequeado = e.target.checked
    
                    if (filtroParty.includes(queInput) && !estaChequeado) { 
                        filtroParty = filtroParty.filter(partido => partido !== queInput)
    
                    } else if (!filtroParty.includes(queInput) && estaChequeado) { 
                        filtroParty.push(queInput)
                    }
                    agregarNuevaPersona()
    
                })
            })

            let filterState = []
    
            members.forEach(data => {
                if (!filterState.includes(data.state)) {
                    filterState.push(data.state)
                } 
            })
    
            filterState = filterState.sort()
    
            filterState.forEach(contenido => {
                let option = document.createElement('option')
                option.innerText = contenido 
                option.value = contenido 
                document.getElementById('selector_state').appendChild(option) 
    
            })
    
            document.getElementById('selector_state').addEventListener('change', (e) => {
                let selectorState = e.target.value 
                filtroEstado = selectorState   
                agregarNuevaPersona()
            })
       
        } else {
    
            const statistics = {
                democrats: [],      
                republicans: [],     
                independents: [],     
                democratsTotal: 0,    
                republicansTotal: 0,   
                independentsTotal: 0,    
                totalPartidos: [],       
                masLeales: [],       
                menosLeales: [],      
                masComprometidos: [],    
                menosComprometidos: [],   
                votosPerdidosR: 0,         
                votosPerdidosI: 0,         
                votosPerdidosD: 0,         
                votosConPartidoDem: 0,    
                votosConPartidoRep: 0,   
                votosConPartidoInd: 0,     
            }
              
            statistics.democrats = members.filter((democrat) => {
                return democrat.party === "D"
            })
    
            statistics.votosDemocratas = statistics.democrats.filter(votos => votos.votes_with_party_pct)
    
            statistics.democratsTotal = statistics.democrats.length;
    
            statistics.republicans = members.filter((republican) => {
                return republican.party === "R"
            })
            statistics.republicansTotal = statistics.republicans.length;
    
            statistics.independents = members.filter((independet) => {
                return independet.party === "ID"
            })
            statistics.independentsTotal = statistics.independents.length;
    
            var array1 = []
            var array2 = []
            var array3 = []
    
            statistics.democrats.forEach(votos => array1.push(votos.missed_votes_pct))
            array1 = array1.reduce((a, b) => a + b / statistics.democratsTotal, 0)
            statistics.votosPerdidosD = array1.toFixed(2)
    
    
            statistics.republicans.forEach(votos => array2.push(votos.missed_votes_pct))
            array2 = array2.reduce((a, b) => a + b / statistics.republicansTotal, 0)
            statistics.votosPerdidosR = array2.toFixed(2)
    
    
            statistics.independents.forEach(votos => array3.push(votos.missed_votes_pct))
            array3 = array3.reduce((a, b) => a + b / statistics.independentsTotal, 0)
            statistics.votosPerdidosInd = array3.toFixed(2)
       
            var array4 = []
            var array5 = []
            var array6 = []
    
            statistics.democrats.forEach(votos => array4.push(votos.votes_with_party_pct))
            array4 = array4.reduce((a, b) => a + b / statistics.democratsTotal, 0)
            statistics.votosConPartidoDem = array4.toFixed(2)
       
            statistics.republicans.forEach(votos => array5.push(votos.votes_with_party_pct))
            array5 = array5.reduce((a, b) => a + b / statistics.republicansTotal, 0)
            statistics.votosConPartidoRep = array5.toFixed(2)
        
            statistics.independents.forEach(votos => array6.push(votos.votes_with_party_pct))
            array6 = array6.reduce((a, b) => a + b / statistics.independentsTotal, 0)
            statistics.votosConPartidoInd = array6.toFixed(2)
        
            statistics.totalPartidos = members.length
        
            var calcular = Math.ceil((statistics.totalPartidos * 0.1))
    
            var calculo = members.filter(senate => senate.total_votes !== 0).sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
            statistics.masLeales = calculo.slice(0, calcular)
    
            var calculo2 = members.filter(senate => senate.total_votes !== 0).sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
            statistics.menosLeales = calculo2.slice(0, calcular)
    
            var calculo3 = members.filter(senate => senate.total_votes !== 0).sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
            statistics.masComprometidos = calculo3.slice(0, calcular)
    
            var calculo4 = members.filter(senate => senate.total_votes !== 0).sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
            statistics.menosComprometidos = calculo4.slice(0, calcular)

            function addtable(nombre, total, porcentaje) {
    
                    let table_tr = document.createElement('tr')
                    let table_td = document.createElement('td')
                    let table_td2 = document.createElement('td')
                    let table_td3 = document.createElement('td')
                   
                    table_td.innerText = nombre
                    table_td2.innerText = total
                    table_td3.innerText = porcentaje
                    let tableBody = document.getElementById('fila1')
                    table_tr.appendChild(table_td)
                    table_tr.appendChild(table_td2)
                    table_tr.appendChild(table_td3)
                    tableBody.appendChild(table_tr)
            }
    
            if(document.title.includes('Attendance')) {
                addtable('Democrats',statistics.democratsTotal, statistics.votosPerdidosD + '%' )
                addtable('Republicans',statistics.republicansTotal, statistics.votosPerdidosR + '%' )
                addtable('independents',statistics.independentsTotal, statistics.votosPerdidosI + '%' )
                addtable('Total', statistics.totalPartidos, '-' )
                pintarTabla("menosComprometidos", "fila2")
                pintarTabla("masComprometidos", "fila3")
              
            } else {
                addtable('Democrats',statistics.democratsTotal, statistics.votosConPartidoDem + '%' )
                addtable('Republicans',statistics.republicansTotal, statistics.votosConPartidoRep + '%' )
                addtable('Independents',statistics.independentsTotal, statistics.votosConPartidoInd + '%' )
                addtable('Total', statistics.totalPartidos, '-' )
                pintarTabla("menosLeales", "fila2")
                pintarTabla("masLeales", "fila3")
            }
           
            function pintarTabla( propiedad, padre) {
                statistics[propiedad].forEach((senate) => {
                    let fila = document.createElement('tr')
                    let infoName = document.createElement('td')
                    let names = `${senate.last_name} ${senate.first_name || senate.middle_name}`
                    infoName.innerHTML = names.link(senate.url)
                    let nroVotes = document.createElement('td')
                    let infoVotes = document.createElement('td') 
                    let votosParty = Math.round((senate.total_votes - senate.missed_votes) * senate.votes_with_party_pct / 100)
                    if(document.title.includes('Attendance')){
                        infoVotes.innerText = senate.missed_votes
                        nroVotes.innerText = senate.missed_votes_pct + '%'
                    }else {
                        infoVotes.innerText = votosParty
                        nroVotes.innerText = senate.votes_with_party_pct + '%'
                    }
                   
                    fila.appendChild(infoName)
                    fila.appendChild(infoVotes)
                    fila.appendChild(nroVotes)
                   
                    document.getElementById(padre).appendChild(fila)
                })
            }
        }
    }
})