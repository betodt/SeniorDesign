#!/bin/make

LATEX=pdflatex
LATEXOPT=--shell-escape
NONSTOP=--interaction=nonstopmode

LATEXMK=latexmk
LATEXMKOPT=-pdf
CONTINUOUS=-pvc

PROGRAM="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

UNAME_S := $(uname -s)

MAIN=main
SOURCES=$(MAIN).tex Makefile abstract.tex introduction.tex usecase.tex
FIGURES := 

INTRO := intro

all:    $(MAIN).pdf

.refresh:
	touch .refresh

$(MAIN).pdf: $(MAIN).tex .refresh $(SOURCES) $(FIGURES)
		$(LATEX) $(LATEXOPT) $(NONSTOP) $(MAIN)

force:
	touch .refresh
	rm $(MAIN).pdf
	$(LATEXMK) $(LATEXMKOPT) $(CONTINUOUS) \
	    -pdflatex="$(LATEX) $(LATEXOPT) %O %S" $(MAIN)

clean:
	$(LATEX) $(LATEXOPT) $(NONSTOP) $(MAIN)
	$(LATEX) $(LATEXOPT) $(NONSTOP) $(MAIN)
	rm -f $(MAIN).pdfsync
	rm -rf *~ *.tmp
	rm -f *.bbl *.blg *.aux *.end *.fls *.log *.out *.fdb_latexmk
	$(PROGRAM) $(MAIN).pdf

once:
	$(LATEXMK) $(LATEXMKOPT) -pdflatex="$(LATEX) $(LATEXOPT) %O %S" $(MAIN)

debug:
	$(LATEX) $(LATEXOPT) $(MAIN)

intro: $(INTRO).tex
	$(LATEX) $(LATEXOPT) $(NONSTOP) $(INTRO).tex
	$(PROGRAM) $(INTRO).pdf

.PHONY: clean force once all