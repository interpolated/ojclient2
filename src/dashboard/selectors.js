import dummystate from './dummystate'
import * as R from 'ramda'

// export const projectPhases(state)


export const getActivePhases = state => {
    const activeProject = state.activeProject
    if(!!activeProject){
        return !!(state.projects[activeProject])?state.projects[activeProject].phases:'no project selected'
    }else{
        return 'no project selected'
    }
}

export const getActiveAllocations = state =>{
    if (getActivePhases(state)!='no project selected'){
        if (state.activePhase===''|state.activePhase==='Master'){
            console.log('yaaa')
            const allocations = (R.pluck('allocation',getActivePhases(state)))
            console.log(allocations)
            return ([...allocations])
        }else{
            const phases = (getActivePhases(state))
            const allocations = R.find(R.propEq('phaseName',state.activePhase))(phases)
            return (allocations.allocation)
        }
    }else{
        return 'no project selected'
    }
}

export const getFilteredPhase = state =>{
    if (!state.activePhase!=''){
        const allocations = (R.pluck('allocation',getActivePhases(state)))
        // console.log(R.concat(R.pluck('allocation',getActivePhases(state))))
        console.log(allocations)
        return ([...allocations])
    }else{
        return 'no project selected'
    }
}