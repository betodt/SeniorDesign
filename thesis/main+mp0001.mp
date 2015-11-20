%% Do not edit, this file has been generated
%% automatically by main.tex via gmp.sty

verbatimtex%&latex
\documentclass[10pt]{article}


\begin{document}
etex;

input expressg;
outputtemplate:= "%j.mps";
beginfig(1);
Actor.user("User");
 
Usecase.create("Create Project");
 Usecase.add("Add", "Team Members");
 Usecase.assign("Create &", "Assign Tasks");
 
add.w = user.human.e + (10,0);
 
create.s = add.n + (0,10);
 assign.n = add.s - (0,10);
 

drawObjects(user, add, create, assign);
 clink(association)(user.human, create);
 clink(association)(user.human, add);
 clink(association)(user.human, assign);
 
endfig;
end.
verbatimtex
\end{document}
etex
