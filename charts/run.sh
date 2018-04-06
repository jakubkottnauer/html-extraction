#!/bin/bash
echo `gnuplot -e "f='fileSuccess'" correctlyExtracted.gp`
echo `gnuplot -e "f='duration'" durationFilesize.gp`
echo `gnuplot -e "f='extractors'" extractorSuccess.gp`
