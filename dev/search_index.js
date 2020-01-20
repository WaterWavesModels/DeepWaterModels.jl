var documenterSearchIndex = {"docs":
[{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"EditURL = \"https://github.com/WaterWavesModels/ShallowWaterModels.jl/blob/master/examples/two_problems.jl\"","category":"page"},{"location":"examples/two_problems/#Two-water-problems-1","page":"Example","title":"Two water problems","text":"","category":"section"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"notebook","category":"page"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"#using ShallowWaterModels\ninclude(\"../src/dependencies.jl\")","category":"page"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"param = ( μ  = 1/20,\n\t\t\tϵ  = 1/2,\n        \tN  = 2^11,\n            L  = 20,\n            T  = 15,\n            dt = 0.001,\n\t\t\ttheta = 2)\n\ninit     = BellCurve(param)\n\nmodel1    = fdBoussinesq_1b(param)\nsolver1   = RK4(param,model1)\nproblem1 = Problem(model1, init, param, solver1);\n\nmodel2  = fdBoussinesq_1(param)\nsolver2   = RK4(param,model2)\nproblem2 = Problem(model2, init, param, solver2);\nnothing #hide","category":"page"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"p = plot(layout=(2,1))\n\nproblems = [ problem1, problem2 ]\n\nfor problem in problems\n\tprint(\"\\nNow solving the model \",problem.model.label,\"\\n\")\n   \t@time solve!( problem )\n   \tfig_problem!( p, problem )\n\nend\n\n#savefig(\"two_problems.png\"); nothing # hide\ndisplay(p)","category":"page"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"(Image: )","category":"page"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"","category":"page"},{"location":"examples/two_problems/#","page":"Example","title":"Example","text":"This page was generated using Literate.jl.","category":"page"},{"location":"contents/#Contents-1","page":"Contents","title":"Contents","text":"","category":"section"},{"location":"contents/#","page":"Contents","title":"Contents","text":"","category":"page"},{"location":"contents/#Index-1","page":"Contents","title":"Index","text":"","category":"section"},{"location":"contents/#","page":"Contents","title":"Contents","text":"","category":"page"},{"location":"basics/#Code-basics-1","page":"Code basics","title":"Code basics","text":"","category":"section"},{"location":"basics/#Abstract-types-1","page":"Code basics","title":"Abstract types","text":"","category":"section"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"TimeSolver (RK4, Euler, etc), \nAbstractModel (Cheng, Matsuno, etc), \nInitialData (Bump, SolitaryWave, etc)","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Instances are created from Parameters type.","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Parameters","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Une structure Problem  représente un problème donné que l'on va résoudre. Les données seront stockées dans data, qui est vide initialement.","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Problem","category":"page"},{"location":"basics/#ShallowWaterModels.Problem","page":"Code basics","title":"ShallowWaterModels.Problem","text":"Problem( model, initial, param, solver)\n\nmodel   : CGBSW or Matsuno\ninitial : BellCurve\nparam   : must contain N, L, T, dt for Mesh and Times, may contain additional data for Models (ϵ)\nsolver  : RK4 (optional)\n\n\n\n\n\n","category":"type"},{"location":"basics/#Initial-data-1","page":"Code basics","title":"Initial data","text":"","category":"section"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Bump","category":"page"},{"location":"basics/#Shallow-water-models-1","page":"Code basics","title":"Shallow water models","text":"","category":"section"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Cheng","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Matsuno","category":"page"},{"location":"basics/#ShallowWaterModels.Matsuno","page":"Code basics","title":"ShallowWaterModels.Matsuno","text":"Matsuno(params)\n\n\n\n\n\n","category":"type"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"solve!(::Problem)","category":"page"},{"location":"basics/#Main-program-1","page":"Code basics","title":"Main program","text":"","category":"section"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"epsilon = 1/2\nN       = 2^12\nL       = 10\nT       = 5\ndt      = 0.001\n\nparam = Parameters(epsilon,N,L,T,dt)\n\nproblems = [Problem(Cheng,Bump,param,RK4),Problem(Matsuno,Bump,param,RK4)]","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"Cheng est le modèle utilisé. Il prend en valeur Bump, param et définit 3 fonction:","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"init qui construit une donnée initiale à partir de Bump : Uinit=init(Bump,param)\nFwave utilisée pour résoudre dt U= Fwave(U) (avec donnée initiale Uinit)\nbuild qui reconstruit la donnée finale (c'est l'application inverse de init). Ufin=final(U,param)","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"init(::Cheng)\ninit(::Matsuno)","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"build(::Cheng)\nbuild(::Matsuno)","category":"page"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"simuls = [(Cheng,Bump,param1,RK4),(Cheng,Bump,param2,RK4)]","category":"page"},{"location":"basics/#RK4-solver-1","page":"Code basics","title":"RK4 solver","text":"","category":"section"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"RK4","category":"page"},{"location":"basics/#ShallowWaterModels.RK4","page":"Code basics","title":"ShallowWaterModels.RK4","text":"RK4(params)\n\nRunge-Kutta fourth order solver.\n\n\n\n\n\n","category":"type"},{"location":"basics/#","page":"Code basics","title":"Code basics","text":"for p in problems\n    solve!(p)\nend","category":"page"},{"location":"#ShallowWaterModels.jl-1","page":"Documentation","title":"ShallowWaterModels.jl","text":"","category":"section"},{"location":"#","page":"Documentation","title":"Documentation","text":"Modules = [ShallowWaterModels]\nOrder   = [:type, :function]","category":"page"},{"location":"#ShallowWaterModels.BellCurve","page":"Documentation","title":"ShallowWaterModels.BellCurve","text":"BellCurve(param)\nparam should contain a value theta\n\nh = 2^(-x^theta)\n\nu = 0\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.Boussinesq","page":"Documentation","title":"ShallowWaterModels.Boussinesq","text":"Boussinesq(params)\nA Hamiltonian Boussinesq system derived in BonaSmith76 and studied in BonaChenSaut02\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.CGBSW","page":"Documentation","title":"ShallowWaterModels.CGBSW","text":"CGBSW( params )\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.CGBSW_naive","page":"Documentation","title":"ShallowWaterModels.CGBSW_naive","text":"CGBSW_naive( params )\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.HighFreq","page":"Documentation","title":"ShallowWaterModels.HighFreq","text":"HighFreq(param)\nparam should contain s (regularity index) and freq (frequencies)\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.Matsuno_mod_naive","page":"Documentation","title":"ShallowWaterModels.Matsuno_mod_naive","text":"Modified Matsuno models with a naive step function\nMatsuno_mod_naive(params)\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.Matsuno_naive","page":"Documentation","title":"ShallowWaterModels.Matsuno_naive","text":"Matsuno(params)\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.Random","page":"Documentation","title":"ShallowWaterModels.Random","text":"Random(param,s,k)\nparam should contain s (regularity index)\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.fdBoussinesq_1","page":"Documentation","title":"ShallowWaterModels.fdBoussinesq_1","text":"fdBoussinesq_1(params)\nThis model has been introduced and studied by E. Dinvay and collaborators\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.fdBoussinesq_1b","page":"Documentation","title":"ShallowWaterModels.fdBoussinesq_1b","text":"fdBoussinesq_1(params)\nThis model has been introduced and studied by E. Dinvay and collaborators\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.fdBoussinesq_2","page":"Documentation","title":"ShallowWaterModels.fdBoussinesq_2","text":"fdBoussinesq_1(params)\nA quasilinear version of the model introduced and studied by E. Dinvay and collaborators\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.fdBoussinesq_2b","page":"Documentation","title":"ShallowWaterModels.fdBoussinesq_2b","text":"fdBoussinesq_2(params)\nA quasilinear version of the model introduced and studied by E. Dinvay and collaborators\n\n\n\n\n\n","category":"type"},{"location":"#ShallowWaterModels.mapfro-Tuple{Boussinesq,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(Boussinesq, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{CGBSW,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(CGBSW, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{CGBSW_naive,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(CGBSW_naive, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{Matsuno,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(Matsuno, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{Matsuno_mod_naive,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(Matsuno, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{Matsuno_naive,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(Matsuno, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{fdBoussinesq_1,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(fdBoussinesq_1, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{fdBoussinesq_1b,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(fdBoussinesq_1b, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{fdBoussinesq_2,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(fdBoussinesq_2, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapfro-Tuple{fdBoussinesq_2b,Array{Complex{Float64},2}}","page":"Documentation","title":"ShallowWaterModels.mapfro","text":"mapfro(fdBoussinesq_2b, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{Boussinesq,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(Boussinesq, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{CGBSW,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(CGBSW, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{CGBSW_naive,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(CGBSW_naive, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{Matsuno,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(Matsuno, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{Matsuno_mod_naive,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(Matsuno, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{Matsuno_naive,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(Matsuno, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{fdBoussinesq_1,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(fdBoussinesq_1, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{fdBoussinesq_1b,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(fdBoussinesq_1b, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{fdBoussinesq_2,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(fdBoussinesq_2, data)\n\n\n\n\n\n","category":"method"},{"location":"#ShallowWaterModels.mapto-Tuple{fdBoussinesq_2b,InitialData}","page":"Documentation","title":"ShallowWaterModels.mapto","text":"mapto(fdBoussinesq_2b, data)\n\n\n\n\n\n","category":"method"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"EditURL = \"https://github.com/WaterWavesModels/ShallowWaterModels.jl/blob/master/examples/animation.jl\"","category":"page"},{"location":"examples/animation/#Animation-1","page":"Animation","title":"Animation","text":"","category":"section"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"deep water problem solved with Cheng model animation","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"notebook","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"#using ShallowWaterModels\ninclude(\"../src/dependencies.jl\")","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"param = ( μ  = 1/20,\n          ϵ  = 1/2,\n          N  = 2^11,\n          L  = 10,\n          T  = 8.0,\n          dt = 0.001,\n          theta = 2)\n\ninitial = BellCurve(param)\nsolver  = RK4(param)\nmodel   = fdBoussinesq_1(param)\nproblem = Problem( model, initial, param )","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"print(\"\\nNow solving the model \",problem.model.label,\"\\n\")\n@time solve!( problem )","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"print(\"\\nNow generating the animation\\n\")\n@time create_animation( problem )","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"(Image: )","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"","category":"page"},{"location":"examples/animation/#","page":"Animation","title":"Animation","text":"This page was generated using Literate.jl.","category":"page"}]
}
