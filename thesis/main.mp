%%% main.mp -- do not edit, generated automatically by main.tex
verbatimtex
\documentclass [10pt]{article}
\begin {document}
etex;
input metauml;
beginfig(1);
LaTeX_unitlength := 1.0pt;
w := 500*LaTeX_unitlength;
h := 500*LaTeX_unitlength;
  Actor.user("User");

  Usecase.create("Create Project");
  Usecase.add("Add", "Team Members");
  Usecase.assign("Create &", "Assign Tasks");

  create.w = user.human.e + (0,60);
  add.s = create.n + (0,10);
  assign.n = create.s - (0,10);


  drawObjects(user, create, add, assign);
  clink(association)(user.human, create);
  clink(association)(user.human, add);
  clink(association)(user.human, assign);
endfig;
verbatimtex
\end{document}
etex;
%%% the end.
end.
endinput;
