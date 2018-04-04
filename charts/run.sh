#!/bin/bash
echo `gnuplot -e "f='results'" correctlyExtracted.gp`
echo `gnuplot -e "f='results'" durationFilesize.gp`
