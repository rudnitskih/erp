javascript: (function(e, a, g, h, f, c, b, d) {
    if (!(f = e.jQuery) || g > f.fn.jquery || h(f)) {
        c = a.createElement("script");
        c.type = "text/javascript";
        c.src = "//ajax.googleapis.com/ajax/libs/jquery/" + g + "/jquery.min.js";
        c.onload = c.onreadystatechange = function() {
            if (!b && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
                h((f = e.jQuery).noConflict(1), b = 1);
                f(c).remove();
            }
        };
        a.documentElement.childNodes[0].appendChild(c);
    }
})(window, document, "2.0.1", function($, L) {
    var config = {
        dayoffs: ["Сб", "Вс"],
        rows: 3,
        summaryHours: 8
    };

    var $table = $("#Hxctimecard").find("td.x1s").eq(0).closest("table"),
        $rows = $table.find("> tbody > tr"),
        cellsNumber = $rows.eq(1).find("td.x1u input").length,
        sumHoursPerDay,
        cellValue,
        $row,
        $cells,
        daysTitle = getDaysTitle();

    for (var cellNumber = 0; cellNumber < cellsNumber; cellNumber++) {
        sumHoursPerDay = 0;
        for (var rowNumber = 1; rowNumber <= config.rows; rowNumber++) {
            $row = $rows.eq(rowNumber);
            $cells = $row.find("td.x1u input");
            if (isDayoff(cellNumber)) {
                cellValue = 0;
            } else {
                if (rowNumber === config.rows) {
                    cellValue = config.summaryHours - sumHoursPerDay;
                } else {
                    cellValue = getRandomInt(0, config.summaryHours - sumHoursPerDay);
                }   
            }
            
            sumHoursPerDay += cellValue;
            $cells.eq(cellNumber).val(cellValue);
        }
    };

    function isDayoff (cellNumber) {
        var dayOff = false;
        config.dayoffs.forEach(function(dayoff){
            if (daysTitle[cellNumber].indexOf(dayoff) > -1) {
                dayOff = true;
                return false;
            }
        });

        return dayOff;
    }

    function getDaysTitle (argument) {
        var firstDayIndex = $rows.eq(1).find("td.x1u").eq(0).index(),
            $titles = $rows.eq(0).find("span.x1y"),
            titlesText = [];

        for (var i = 0; i < cellsNumber; i++) {
            titlesText.push($titles.eq(firstDayIndex + i).text());
        }

        return titlesText;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

});
