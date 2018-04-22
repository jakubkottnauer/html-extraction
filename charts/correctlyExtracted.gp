set terminal pdf enhanced size 7,5 font "arial, 16"
set encoding iso_8859_2
set output './correctlyExtracted.pdf'

set key off
set xlabel ''
set ylabel '# správně vytěžených vlastností'
set grid ytics
set boxwidth 0.4
set style fill solid 1.0
set xtics rotate
set ytics rotate
set title
set yrange [0:4]
set ytics 1
plot f using 1:3:xtic(2) with boxes 
