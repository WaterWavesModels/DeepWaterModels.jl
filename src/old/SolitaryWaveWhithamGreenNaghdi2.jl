function SolitaryWaveWhithamGreenNaghdi2(mesh :: Mesh, param :: NamedTuple, guess :: Vector{Float64}; iterative = false :: Bool, verbose = true :: Bool, max_iter = 50, tol = 1e-14, q=1, GN = false)
        # A good guess for low velocities is
        #function sol(x,α)
        #	2*α*sech.(sqrt(3*2*α)/2*x).^2
        #end
        c = param.c
        ϵ = param.ϵ
        μ = param.μ

        k = mesh.k
        F₁ 	= tanh.(sqrt(μ)*abs.(k))./(sqrt(μ)*abs.(k))
        F₁[1] 	= 1
        F₀       = 1im * sqrt.(3*(1 ./F₁ .- 1)).*sign.(k)

        if GN == true
                F₀ = 1im * k ./ (1 .+ μ/3 * k.^2 ).^(1/4)
        end

        Π⅔ = abs.(k) .< maximum(k) * 4/3
        krasny(k) = (abs.(k).> 1e-32 ).*k
        krasny!(k) = k[abs.(k).< 1e-32 ].=0

        Dx       =  1im * mesh.k

        function dealias( v :: Vector{Float64} )
                real.(ifft(krasny(Π⅔.*fft(v))))
        end

        function proj( u :: Vector{Float64}, v :: Vector{Float64} )
            u-0*(v'*u)*v/(norm(v,2)^2)
        end

        function h( v :: Vector{Float64} )
                1 ./(1 .- ϵ*v)
        end
        function ζ( v :: Vector{Float64} )
                v./(1 .- ϵ*v)
        end
        function Four( v )
                real.(ifft(F₀.*fft(v)))
        end

        function E( η :: Vector{Float64} , u :: Vector{Float64} )
                return η.^2 .+ (1 .+ ϵ*η).*(u.^2) .+ μ/3 .* ((1 .+ ϵ*η).^3).* (Four( u ).^2)
        end

        function F( v :: Vector{Float64} )
                return -1/3 ./ (h(v).^2).* Four( (h(v).^3).* Four(v)) .+
                        ϵ/2 .* ( h(v).*Four(v) ).^2 .+
                        v .- 1/(c^2) .*v.*h(v) .- ϵ/2 .* v.^2
        end

        if iterative == false
                k = mesh.k
                x = mesh.x
                x₀ = mesh.x[1]
                FFT = exp.(-1im*k*(x.-x₀)');
                IFFT = exp.(1im*k*(x.-x₀)')/length(x);
                Id = Diagonal(ones(size(x)));
                M₀ = real.(IFFT*(Diagonal( F₀)*FFT))
                M(v) = Diagonal( v )
                function JacF( v :: Vector{Float64} )
                        -1/3 *M(1 ./ (h(v).^2))* M₀ * M(h(v).^3)* M₀ .-
                                ϵ * M(1 ./ (h(v).^2)) * M₀ * M( (h(v).^4) .* Four(v) ) .+
                                 2*ϵ/3 * M( 1 ./ h(v) .* Four(((h(v).^3).* Four(v) ) ) ) .+
                                 ϵ * M( (h(v).^2) .* Four(v) ) * M₀ .+
                                 ϵ^2 * M( h(v).^3 .* Four(v).^2 ) .+
                                 Id .- M(h(v).^2)./(c^2) .- ϵ* M( v )
                end
        else
                function JacFfast( v :: Vector{Float64} )
                        dF(φ) = -1/3 ./ (h(v).^2).* Four( (h(v).^3).* Four( φ ) ) .-
                                ϵ ./ (h(v).^2).* Four( (h(v).^4).* φ .* Four( v ) ) .+
                                 2*ϵ/3 .* φ ./ h(v).* Four( (h(v).^3).* Four( v ) ) .+
                                 ϵ .* (h(v).*Four(v)).*( h(v) .* Four( φ ) .+ ϵ.*φ.* (h(v).^2) .* Four(v) ) .+
                                 φ .- φ.* (h(v).^2)./(c^2) .- ϵ* v.* φ
                        return LinearMap(dF, length(v); issymmetric=true, ismutating=false)
                end
        end

        flag=0
        iter = 0
        err = 1
        u = dealias(guess./(1 .+ ϵ*guess)) # initial guess for iteration
        du = similar(F(u))
        fu = similar(F(u))
        dxu = similar(u)
        for i in range(1, length=max_iter)
                dxu .= real.(ifft(Dx.*fft(u)))
                dxu ./= norm(dxu,2)
                fu .= F(dealias(u))
                err = norm(fu,Inf)
    		if err < tol
    			@info string("Converged : ",err,"\n")
    			break
    		elseif verbose == true
                        print(string("error at step ",i,": ",err,"\n"))
    		end
                if i == max_iter
                        flag=1
                        @warn  "The algorithm did not converge"
                end
                if iterative == false
                        du .=  JacF(u) \ fu
                else
                        du .=  gmres( JacFfast(u) , fu )
                end
    		u .-= dealias(q*du)
        end

        return (ζ(u),c*u,flag)
end
