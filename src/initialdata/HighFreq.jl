export HighFreq

"""
    HighFreq(param,s,k)

"""
struct HighFreq <: InitialData

    h :: Vector{Float64}
    u :: Vector{Float64}

    function HighFreq(p :: NamedTuple, s :: Real, ks :: Any)

    	mesh  = Mesh(-p.L, p.L, p.N)
        h = cos.(mesh.x).*0
        for j in ks
            h.+=(1/(2*pi*j)^s)*cos.(2*pi*j*mesh.x)
        end
        h .*= -exp.(-((abs.(mesh.x)).^2)*log(2))
        u = mesh.x.*h
    	new( h,u )

    end


end