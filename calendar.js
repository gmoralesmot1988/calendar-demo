<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js'></script>
<script>
function convertDateToISO(dateString) {
    var parts = dateString.split(' ');
    if (parts.length !== 2) {
        console.error('Formato de fecha y hora incorrecto:', dateString);
        return '';
    }
    var dateParts = parts[0].split('-');
    var timeParts = parts[1].split(':');
    if (dateParts.length !== 3 || timeParts.length !== 2) {
        console.error('Formato de fecha o hora incorrecto:', dateString);
        return '';
    }
    return `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dateParts[2].padStart(2, '0')}T${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:00`;
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('divCalendar');
    if (!calendarEl) {
        console.error('El elemento #divCalendar no se encontró en el DOM');
        return;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        buttonIcons: true,
        allDaySlot: true,
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            prev: 'Anterior',
            next: 'Siguiente',
            week: 'Semana',
            day: 'Día',
            list: 'Lista'
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        },
        views: {
            listMonth: {
                buttonText: 'Lista Mensual'
            }
        },
        eventDidMount: function(info) {
            var tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            var startDate = new Date(info.event.start);
            var formattedDate = startDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            tooltip.innerText = `${formattedDate} - ${info.event.title}`;
            document.body.appendChild(tooltip);

            info.el.addEventListener('mouseenter', function(e) {
                tooltip.style.display = 'block';
                // Calcula las coordenadas del tooltip basadas en la posición del cursor y el tamaño del tooltip
                var posX = e.pageX - tooltip.offsetWidth / 2;
                var posY = e.pageY - tooltip.offsetHeight - 20;

                // Ajustar la posición horizontal para evitar que se salga de la pantalla
                posX = Math.max(10, posX); // Evita el lado izquierdo
                posX = Math.min(window.innerWidth - tooltip.offsetWidth - 10, posX); // Evita el lado derecho

                // Ajustar la posición vertical para evitar que se salga de la pantalla
                if (posY < 10) {
                    posY = e.pageY + 20; // Si no cabe arriba, colócalo debajo del cursor
                }

                tooltip.style.left = `${posX}px`;
                tooltip.style.top = `${posY}px`;
            });

            info.el.addEventListener('mouseleave', function() {
                tooltip.style.display = 'none';
            });
        }
    });
    
    

    calendar.render();

    if (typeof $ !== 'undefined') {
        $('.ec-col-item').each(function() {
            var eventTitle = $(this).find('.title div').first().text().trim();
            var startDateText = $(this).find('.start-date div').first().text().trim();
            var endDateText = $(this).find('.end-date div').first().text().trim();

            var startDate = convertDateToISO(startDateText);
            var endDate = convertDateToISO(endDateText);
            var event = {
                title: eventTitle,
                start: startDate,
                end: endDate,
                allDay: true,
                className: $(this).find('.classname div').first().text().trim()
            };
            calendar.addEvent(event);
        });
    } else {
        console.error('jQuery no está definido');
    }
});



</script>




<style>
table{
	color: var(--color-main);
}


.fc-time-grid .fc-day.fc-day-today .fc-content-skeleton .fc-row.fc-scrollgrid-sync-table {
    display: none;
}

.fc-h-event .fc-event-main, .fc-v-event .fc-event-main {
    color: inherit;
}

.fc-col-header-cell-cushion, .fc-list-day-text {
text-transform: capitalize;
}
.fc-event.Verde {
background-color: #DFEBE2!important;
color: #22943B!important;
}

.fc-event.Rojo {
background-color: #F4E1E1!important;
color: #EF2E2E!important;
}

.fc-event.Gris {
background-color: #9e28e51c!important;
color: #9E28E5!important;

}

.fc-event.Morado {
background-color: #ECE0F3!important;
color: #9E28E5!important;
}

.fc-event.Azul {
background-color: #E1E6F4!important;
color: #2E64EF!important;
}

.fc-event.Naranja {
background-color: #F5E8DF!important;
color: #F77B20!important;
}

.fc .fc-list-event-dot, .fc-daygrid-event-dot {
display:none;
}
.fc-state-default {
    background-color: #f5f5f5;
    background-image: none;
    background-image: none;
    background-image: none;
    background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: none;
    background-repeat: repeat-x;
    border-color: #e6e6e6 #e6e6e6 #bfbfbf;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    text-shadow: none;
    box-shadow: none;
}



.fc-state-highlight {
    background-color: var(--color-main);
    color: #fff!important;
}
#calendar-rcsa .fc-state-highlight.fc-day-numbrer {
    color: #fff!important;
	border-color: #fff!important;
}

.fc-cell-overlay {
background-color:#4835d9!important;
border-color:#1a1a1a!important;
color:#fff!important;
opacity:0.4!important;
}

.fc-state-default.fc-corner-right {
border-top-right-radius: 0px!important;
border-bottom-right-radius: 0px!important;
}
.fc-state-default.fc-corner-left {
  border-top-left-radius: 0px!important;
border-bottom-left-radius: 0px!important;
}
.fc-state-hover {
background-color:var(--color-secondary)!important;
border-color:var(--color-secondary)!important;
color:var(--color-main)!important;
}



.fc-state-active, .fc-button-primary {
background-color: var(--color-main)!important;
border-color: var(--color-main)!important;
color:#fff!important;
}
.fc-state-down {
background-color:rgba(0,0,0,0.45)!important;
border-color:rgba(255,255,255,0.30)!important;
color:#fff!important;
}
.fc-state-disabled {
border-color:#fff!important;
color:#fff!important;
opacity:0.2!important;
}
.fc-other-month {
background-color:rgba(0,0,0,0.7)!important;
opacity:0.3!important;
}
.ec-col-list-wrap {display:none!important;}

@media all and (max-width: 581px){
/* responsive update 28-02-22 */
.fc-header tr {
     display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   
   -webkit-flex-direction: row;
   -ms-flex-direction: row;
    flex-direction: row;

-webkit-align-items: stretch;
-ms-flex-align: stretch;
align-items: stretch;

   -webkit-justify-content: space-between;
   -ms-flex-pack: justify;
    justify-content: space-between;
    
    -webkit-flex-flow:row wrap;
    -ms-flex-flow:row wrap;
    flex-flow:row wrap;
}

.fc-header tr td {
  width: 50%;
  order: 2;
  -webkit-order:2;

}

.fc-header tr td.fc-header-center {
  width: 100%;
  order: 1;
  -webkit-order:1;
}}

.fc-toolbar-title, .fc-day-header {
    text-transform: uppercase; /* Asegura que cada palabra comience con mayúscula */
}

.tooltip {
    position: absolute;
    background-color: #123a5e; /* Color de fondo oscuro */
    color: white; /* Texto en color blanco */
    padding: 12px; /* Más padding para mejor lectura */
    border-radius: 6px; /* Bordes redondeados para un look más moderno */
    display: none; /* Inicialmente oculto */
    z-index: 100; /* Asegura que esté sobre otros elementos */
    white-space: nowrap; /* Evita que el texto se divida en múltiples líneas */
    font-size: 14px; /* Tamaño de letra adecuado para legibilidad */
    box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Sombra suave para destacar sobre el contenido */
}

@media only screen and (max-width: 600px) {
    .tooltip {
        font-size: 16px; /* Tamaño de letra más grande en móviles para fácil lectura */
        padding: 16px; /* Mayor padding en móviles para tocar más fácilmente */
    }
}

@media only screen and (max-width: 600px) {
    .fc .fc-toolbar {
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        row-gap: 0.5rem;
    }
}

/*ajuste de texo */

.fc-event .fc-event-title, .fc-event .fc-event-title-container {
    white-space: normal; /* Permite que el texto se ajuste y no se quede en una sola línea */
    overflow: hidden; /* Oculta cualquier desbordamiento de texto */
    text-overflow: ellipsis; /* Añade puntos suspensivos si el texto es demasiado largo */
}

.fc-event {
    height: auto; /* Permite que la altura del evento se ajuste al contenido */
    min-height: 20px; /* Establece una altura mínima para los eventos */
}

.fc-daygrid-event {
    margin-bottom: 1px; /* Añade un pequeño margen entre eventos */
}


</style>
