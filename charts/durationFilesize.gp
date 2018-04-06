set terminal pdf enhanced size 7,5 font "arial, 16"
set encoding iso_8859_2
set output './durationFilesize.pdf'

filesizeCol="#7AC36A"
durationCol="#5A9BD4"

set title 'Porovnání velikosti souboru a doby extrakce'
set xlabel ''
set ylabel 'ms'
set y2label 'kB'
set grid ytics
set boxwidth 0.4
set style fill solid 1.0
set xtics rotate by 45 right
set ytics nomirror tc lt 1 textcolor rgb durationCol
set y2tics nomirror tc lt 2 textcolor rgb filesizeCol
set style data histograms


plot "<(sed -n '1,15p' duration)" using 4:xtic(2) title "Doba extrakce" lc rgb durationCol axis x1y1,\
     "" using 5 title "Velikost souboru" lc rgb filesizeCol axis x1y2
