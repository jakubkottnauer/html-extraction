set terminal pdf enhanced size 2,5 font "arial, 16"
set encoding iso_8859_2
set output './extractorDuration.pdf'

set key off
set xlabel ''
set ylabel 'Průměrná doba běhu extraktorů (ms)'
set grid ytics
set boxwidth 0.4 relative
set style fill solid 1.0
set xtics rotate
set ytics rotate
set title

plot f using 1:3:xtic(2) with boxes 
