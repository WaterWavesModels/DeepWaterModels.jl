# # Deep water problems with high frequency component
#using DeepWaterModels
include("../src/dependencies.jl")

#----
param = ( ϵ  = 1,
        	N  = 2^14,
            L  = 10,
            T  = 5,
            dt = 0.001)

init1 = HighFreq(param,2,20);
init2 = HighFreq(param,2,100);
init3 = HighFreq(param,2,200);

model0    = Matsuno_mod_naive(param);
model1    = Matsuno_naive(param);
model2    = Matsuno(param);

problem01 = Problem(model0, init1, param);
problem11 = Problem(model1, init1, param);
problem21 = Problem(model2, init1, param);
problem02 = Problem(model0, init2, param);
problem12 = Problem(model1, init2, param);
problem22 = Problem(model2, init2, param);
problem03 = Problem(model0, init3, param);
problem13 = Problem(model1, init3, param);
problem23 = Problem(model2, init3, param);

problemsX1 = [ problem01, problem11, problem21 ];
problemsX2 = [ problem02, problem12, problem22 ];
problemsX3 = [ problem03, problem13, problem23 ];

problems0X = [ problem01, problem02, problem03 ];
problems1X = [ problem11, problem12, problem13 ];
problems2X = [ problem21, problem22, problem23 ];

problems = vcat(problems0X,problems1X,problems2X);

#----

p = plot(layout=(2,1))

for problem in problems
	print("\nNow solving the model ",problem.model.label,"\n")
   	@time solve!( problem )
   	fig_problem!( p, problem )

end

#savefig("high_freq.png"); nothing # hide
display(p)

pn=plot()

for problem in problems
    norm_problem!( pn, problem ,2)
end
display(pn)

p0 = plot(layout=(2,1))
p01 = plot(layout=(2,1))
p1 = plot(layout=(2,1))
p2 = plot(layout=(2,1))
p3 = plot(layout=(2,1))
p4 = plot(layout=(2,1))
p5 = plot(layout=(2,1))

for problem in problems
	fig_problem!( p0, problem,0 )
	fig_problem!( p01, problem,0.1 )
	fig_problem!( p1, problem,1 )
	fig_problem!( p2, problem,2 )
	fig_problem!( p3, problem,3 )
	fig_problem!( p4, problem,4 )
	fig_problem!( p5, problem,5 )
end

using JLD
@save "HighFreq.jld"