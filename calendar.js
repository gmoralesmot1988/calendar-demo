
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







</style>
