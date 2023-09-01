import { Engine, MoveDirection, OutMode, tsParticles } from "tsparticles-engine";
import { loadBasic } from "tsparticles-basic";



export async function loadStarsPreset(engine: Engine, refresh = true,elementId :string): Promise<void> {
  await loadBasic(engine, false);

  await engine.addPreset("stars", options, refresh);

  tsParticles.load(elementId, options)
  
}


export const options = {
    background: {
        color: "#000",
    },
    particles: {
        number: {
            value: 100,
        },
        move: {
            direction: MoveDirection.none,
            enable: true,
            outModes: {
                default: OutMode.out,
            },
            random: true,
            speed: 0.1,
            straight: false,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
            value: { min: 0, max: 1 },
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
};