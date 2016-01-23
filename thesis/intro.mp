%%% intro.mp -- do not edit, generated automatically by intro.tex
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

  add.w = user.human.e + (10,0);

  create.s = add.n + (0,10);
  assign.n = add.s - (0,10);


  drawObjects(user, add, create, assign);
  clink(association)(user.human, create);
  clink(association)(user.human, add);
  clink(association)(user.human, assign);
endfig;
beginfig(2);
LaTeX_unitlength := 1.0pt;
w := 500*LaTeX_unitlength;
h := 500*LaTeX_unitlength;
Begin.b;
Activity.name("Name Project");
Fork.fork("h", 50);
Activity.define("Define project goal");
Activity.deadline("Define project deadline");
Fork.join("h", 50);
Branch.membAdd;
Activity.addProj("Add people to the project");
End.e;

addProj.w = (50, 0.5(e.midy + membAdd.midy));


leftToRight.top(10)(define, deadline);
Group.defineListen(define, deadline);

topToBottom(20)(b, name, fork, defineListen, join, membAdd);

e.n = membAdd.s - (0,40);

drawObjects(b, name, fork, defineListen, join, membAdd, addProj, e);

clink(transition)(b, name);
clink(transition)(name, fork);
clink(transition)(fork, define);
clink(transition)(fork, deadline);
clink(transition)(define, join);
clink(transition)(deadline, join);
clink(transition)(join, membAdd);
clink(transition)(join, membAdd);
link(transition)(pathStepX(membAdd.e, addProj.n,  addProj.midx - membAdd.width));
link(transition)(pathStepX(addProj.s, e.e, 0));
clink(transition)(membAdd, e);

item(iGuard)("add members")(obj.sw = membAdd.e);
item(iGuard)("done")(obj.nw = membAdd.s + (0, -4));
endfig;
beginfig(3);
LaTeX_unitlength := 1.0pt;
w := 500*LaTeX_unitlength;
h := 500*LaTeX_unitlength;
Begin.be;
Activity.tName("Enter team description");
Branch.addMem;
Activity.contact("Enter member contact");
Branch.cFound;
Activity.addToTeam("Add member to team");
Activity.invite("Send email invite");
Branch.cFoundJoin;
Activity.assProj("Assign project lead role");
Activity.submit("Submit Team");
End.en;

leftToRight.top(25)(addToTeam, invite);
topToBottom(20)(be, tName, addMem, contact, cFound, addToTeam, cFoundJoin, assProj, submit, en);

drawObjects(be, tName, addMem, contact, cFound, addToTeam, invite, cFoundJoin, assProj, submit, en);

clink(transition)(be, tName);
clink(transition)(tName, addMem);
clink(transition)(addMem, contact);
link(transition)(pathStepX(cFound.e, invite.n, invite.midx - cFound.width));
clink(transition)(contact, cFound);
link(transition)(pathStepX(invite.s, cFoundJoin.e, 0));
clink(transition)(cFound, addToTeam);
clink(transition)(addToTeam, cFoundJoin);
clink(transition)(cFoundJoin, assProj);
clink(transition)(assProj, submit);
clink(transition)(submit, en);
link(transition)(pathStepX(cFoundJoin.w, addMem.w, -60));

item(iGuard)("add members")(obj.nw = addMem.s + (0, -5));
item(iGuard)("contact found")(obj.nw = cFound.s + (0, -5));
item(iGuard)("contact not found")(obj.sw = cFound.e + (10, 0));
item(iGuard)("not done")(obj.se = cFoundJoin.w + (-10, 0));
endfig;
beginfig(4);
LaTeX_unitlength := 1.0pt;
w := 500*LaTeX_unitlength;
h := 500*LaTeX_unitlength;
Begin.beg;
Activity.task("Select task");
Activity.selectAss("Select members to assign");
Activity.saveT("Save task");
End.fin;

topToBottom(20)(beg, task, selectAss, saveT, fin);

drawObjects(beg, task, selectAss, saveT, fin);

clink(transition)(beg, task);
clink(transition)(task, selectAss);
clink(transition)(selectAss, saveT);
clink(transition)(saveT, fin);
endfig;
beginfig(5);
LaTeX_unitlength := 1.0pt;
w := 500*LaTeX_unitlength;
h := 500*LaTeX_unitlength;

State.L("Leader")();
State.P("Projects")();
State.C("Teams")();
State.T("Tasks")();
State.M("Members")();

leftToRight(150)(P, C);
leftToRight(150)(T, M);

Group.PT(P, C);
Group.TM(T, M);

topToBottom(40)(L, PT, TM);



drawObjects(L, PT, TM);

clink(association)(P, C);
item(iAssoc)("1")(obj.sw = P.e);
item(iAssoc)("1..*")(obj.se = C.w);
item(iAssoc)("composed of")(obj.s =.5[P.e,C.w]);

clink(association)(T, M);
item(iAssoc)("1")(obj.sw = T.e);
item(iAssoc)("1..*")(obj.se = M.w);
item(iAssoc)("complete")(obj.s =.5[T.e,M.w]);

link(association)(pathStepX(P.s, T.n, 0));
item(iAssoc)("1")(obj.ne = P.s - (10, 0));
item(iAssoc)("1..*")(obj.se = T.n - (7, 0));
item(iAssoc)("list")(obj.e =.5[P.s,T.n] - (5, 0));

link(association)(pathStepX(C.s, M.n, 0));
item(iAssoc)("1")(obj.nw = C.s + (6, 0));
item(iAssoc)("1..*")(obj.sw = M.n + (8, 0));
item(iAssoc)("have")(obj.w =.5[C.s,M.n] + (10, 0));

link(association)(pathStepX(L.w, P.n, P.midx));
item(iAssoc)("1")(obj.se = L.w);
item(iAssoc)("1..*")(obj.se = P.n);
item(iAssoc)("makes")(obj.e =.5[L.e,P.w] + (-10, 10));

link(association)(pathStepX(L.e, C.n, C.midx - L.width));
item(iAssoc)("1")(obj.sw = L.e);
item(iAssoc)("1..*")(obj.sw = C.n);
item(iAssoc)("guides")(obj.s =.5[L.e,C.w] + (10, 10));

endfig;
verbatimtex
\end{document}
etex;
%%% the end.
end.
endinput;
