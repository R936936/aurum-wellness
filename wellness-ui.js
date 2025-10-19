/**
 * AURUM WELLNESS - UI EXTENSIONS
 * Version: 2.0.0
 * Advanced UI components and interactions
 */

// ============================================
// MODAL SYSTEM
// ============================================

class ModalSystem {
    constructor() {
        this.createModalContainer();
    }

    createModalContainer() {
        if (!document.getElementById('modal-container')) {
            const container = document.createElement('div');
            container.id = 'modal-container';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                display: none;
                justify-content: center;
                align-items: center;
            `;
            document.body.appendChild(container);
        }
    }

    show(content) {
        const container = document.getElementById('modal-container');
        container.innerHTML = `
            <div style="
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid #00ff00;
                padding: 30px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            ">
                <button onclick="WellnessUI.modal.hide()" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: transparent;
                    border: 1px solid #00ff00;
                    color: #00ff00;
                    padding: 5px 10px;
                    cursor: pointer;
                    font-family: 'Courier New', monospace;
                ">✕ CERRAR</button>
                ${content}
            </div>
        `;
        container.style.display = 'flex';
    }

    hide() {
        const container = document.getElementById('modal-container');
        container.style.display = 'none';
    }
}

// ============================================
// RECIPE DETAILS VIEWER
// ============================================

class RecipeViewer {
    showRecipeDetails(recipeId) {
        const recipe = window.WellnessCore.recipes.getRecipeById(recipeId);
        
        if (!recipe) {
            console.error('Recipe not found:', recipeId);
            return;
        }

        const content = `
            <h2 style="color: #fff; text-shadow: 0 0 10px #00ff00; margin-bottom: 20px;">
                ${recipe.name}
            </h2>
            
            <div style="color: #FFD700; margin-bottom: 15px;">
                <strong>Categoría:</strong> ${recipe.category}<br>
                <strong>Tiempo:</strong> ${recipe.preparationTime}<br>
                <strong>Porciones:</strong> ${recipe.servings}<br>
                <strong>Completado:</strong> ${recipe.completedCount} veces
            </div>

            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">Beneficios:</h3>
                <div style="color: #FFD700;">
                    ${recipe.benefits.map(b => `✓ ${b}`).join('<br>')}
                </div>
            </div>

            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">Ingredientes:</h3>
                <div style="color: #FFD700;">
                    ${recipe.ingredients.map(i => `• ${i}`).join('<br>')}
                </div>
            </div>

            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">Instrucciones:</h3>
                <div style="color: #FFD700;">
                    ${recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('<br>')}
                </div>
            </div>

            <div style="margin-top: 30px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="cyber-button" onclick="WellnessUI.recipe.markCompleted(${recipeId})">
                    ✓ Marcar como Completada
                </button>
                <button class="cyber-button" onclick="WellnessUI.recipe.toggleFavorite(${recipeId})">
                    ${recipe.favorites ? '★' : '☆'} Favorito
                </button>
                <button class="cyber-button" onclick="WellnessUI.recipe.showRating(${recipeId})">
                    ⭐ Calificar
                </button>
            </div>
        `;

        window.WellnessUI.modal.show(content);
    }

    markCompleted(recipeId) {
        window.WellnessCore.recipes.markAsCompleted(recipeId);
        window.WellnessCore.user.addExperience(15);
        
        // Refresh display
        this.showRecipeDetails(recipeId);
        
        // Show message in terminal
        const recipe = window.WellnessCore.recipes.getRecipeById(recipeId);
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal('✓ ¡Excelente! Receta completada: ' + recipe.name, false, 100);
            window.appendToTerminal('+ 15 XP', false, 400);
        }
        
        if (window.updateUserStats) {
            window.updateUserStats();
        }
    }

    toggleFavorite(recipeId) {
        const recipe = window.WellnessCore.recipes.toggleFavorite(recipeId);
        this.showRecipeDetails(recipeId);
        
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal(recipe.favorites ? '⭐ Agregado a favoritos' : '☆ Removido de favoritos', false, 100);
        }
    }

    showRating(recipeId) {
        const content = `
            <h2 style="color: #fff; text-shadow: 0 0 10px #00ff00;">Califica esta Receta</h2>
            <div style="margin: 30px 0; text-align: center;">
                ${[1, 2, 3, 4, 5].map(star => `
                    <button onclick="WellnessUI.recipe.rateRecipe(${recipeId}, ${star})" 
                            style="background: transparent; border: none; font-size: 3em; cursor: pointer; color: #FFD700;">
                        ⭐
                    </button>
                `).join('')}
            </div>
            <p style="color: #00ff00; text-align: center;">Selecciona de 1 a 5 estrellas</p>
        `;
        
        window.WellnessUI.modal.show(content);
    }

    rateRecipe(recipeId, rating) {
        window.WellnessCore.recipes.rateRecipe(recipeId, rating);
        window.WellnessCore.user.addExperience(5);
        
        window.WellnessUI.modal.hide();
        
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal(`✓ Calificación guardada: ${rating}/5`, false, 100);
            window.appendToTerminal('+ 5 XP', false, 400);
        }
        
        if (window.updateUserStats) {
            window.updateUserStats();
        }
    }
}

// ============================================
// PROGRAM DETAILS VIEWER
// ============================================

class ProgramViewer {
    showProgramDetails(programId) {
        const program = window.WellnessCore.programs.getProgramById(programId);
        
        if (!program) {
            console.error('Program not found:', programId);
            return;
        }

        const progress = window.WellnessCore.programs.getProgramProgress(programId);
        const activePrograms = window.WellnessCore.programs.getActivePrograms();
        const isEnrolled = activePrograms.some(p => p.programId === programId);

        const content = `
            <h2 style="color: #fff; text-shadow: 0 0 10px #00ff00; margin-bottom: 10px;">
                ${program.icon} ${program.name}
            </h2>
            
            <div style="color: #FFD700; margin-bottom: 20px;">
                <strong>Duración:</strong> ${program.duration}<br>
                <strong>Nivel:</strong> ${program.difficulty}<br>
                ${isEnrolled ? `<strong style="color: #00ff00;">Estado: ACTIVO ✓</strong><br>` : ''}
                ${progress > 0 ? `<strong>Progreso:</strong> ${progress.toFixed(1)}%<br>` : ''}
            </div>

            <p style="color: #FFD700; margin-bottom: 20px;">
                ${program.description}
            </p>

            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">Beneficios Principales:</h3>
                <div style="color: #FFD700;">
                    ${program.benefits.map(b => `✓ ${b}`).join('<br>')}
                </div>
            </div>

            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">Fases del Programa (${program.phases.length} días):</h3>
                <div style="color: #FFD700; max-height: 300px; overflow-y: auto;">
                    ${program.phases.map(phase => `
                        <div style="margin: 10px 0; padding: 10px; border: 1px solid rgba(0, 255, 0, 0.3);">
                            <strong>Día ${phase.day}: ${phase.title}</strong><br>
                            ${phase.activities.map(a => `• ${a}`).join('<br>')}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="margin-top: 30px; display: flex; gap: 10px; flex-wrap: wrap;">
                ${!isEnrolled ? `
                    <button class="cyber-button" onclick="WellnessUI.program.enroll('${programId}')">
                        🚀 Inscribirme Ahora
                    </button>
                ` : `
                    <button class="cyber-button" onclick="WellnessUI.program.showProgress('${programId}')">
                        📊 Ver Mi Progreso
                    </button>
                    <button class="cyber-button" onclick="WellnessUI.program.continueProgram('${programId}')">
                        ▶️ Continuar Programa
                    </button>
                `}
            </div>
        `;

        window.WellnessUI.modal.show(content);
    }

    enroll(programId) {
        const enrollment = window.WellnessCore.programs.enrollInProgram(programId);
        window.WellnessCore.user.addExperience(50);
        
        window.WellnessUI.modal.hide();
        
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal('≫ INSCRIPCIÓN EXITOSA:', true, 100);
            window.appendToTerminal('Tu viaje de transformación comienza ahora...', false, 400);
            window.appendToTerminal('+ 50 XP', false, 700);
        }
        
        if (window.updateUserStats) {
            window.updateUserStats();
        }
    }

    showProgress(programId) {
        const program = window.WellnessCore.programs.getProgramById(programId);
        const activePrograms = window.WellnessCore.programs.getActivePrograms();
        const enrollment = activePrograms.find(p => p.programId === programId);
        
        if (!enrollment) return;

        const progress = window.WellnessCore.programs.getProgramProgress(programId);
        
        const content = `
            <h2 style="color: #fff; text-shadow: 0 0 10px #00ff00;">
                Progreso del Programa
            </h2>
            
            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">${program.name}</h3>
                <div style="color: #FFD700;">
                    <strong>Día Actual:</strong> ${enrollment.currentDay} de ${program.phases.length}<br>
                    <strong>Días Completados:</strong> ${enrollment.completedDays.length}<br>
                    <strong>Progreso:</strong> ${progress.toFixed(1)}%
                </div>
            </div>

            <div style="margin: 20px 0; background: rgba(0, 255, 0, 0.1); height: 20px; border: 1px solid #00ff00; border-radius: 10px; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #00ff00, #FFD700); height: 100%; width: ${progress}%; transition: width 0.5s;"></div>
            </div>

            <div style="margin: 20px 0;">
                <h3 style="color: #00ff00;">Días Completados:</h3>
                <div style="color: #FFD700;">
                    ${enrollment.completedDays.length > 0 
                        ? enrollment.completedDays.map(d => `✓ Día ${d + 1}`).join('<br>')
                        : 'Aún no has completado ningún día. ¡Comienza hoy!'}
                </div>
            </div>

            <button class="cyber-button" onclick="WellnessUI.program.continueProgram('${programId}')">
                ▶️ Continuar
            </button>
        `;

        window.WellnessUI.modal.show(content);
    }

    continueProgram(programId) {
        window.WellnessUI.modal.hide();
        
        const program = window.WellnessCore.programs.getProgramById(programId);
        const activePrograms = window.WellnessCore.programs.getActivePrograms();
        const enrollment = activePrograms.find(p => p.programId === programId);
        
        if (!enrollment || enrollment.currentDay > program.phases.length) {
            if (window.appendToTerminal) {
                window.appendToTerminal('', false, 0);
                window.appendToTerminal('¡Felicidades! Has completado todo el programa.', false, 100);
            }
            return;
        }

        const currentPhase = program.phases[enrollment.currentDay - 1];
        
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal(`≫ DÍA ${currentPhase.day}: ${currentPhase.title}`, true, 100);
            window.appendToTerminal('', false, 300);
            window.appendToTerminal('Actividades de hoy:', false, 500);
            
            currentPhase.activities.forEach((activity, index) => {
                window.appendToTerminal(`${index + 1}. ${activity}`, false, 800 + (index * 300));
            });

            const delay = 800 + (currentPhase.activities.length * 300) + 500;
            
            setTimeout(() => {
                const output = document.getElementById('terminal-output');
                const btn = document.createElement('button');
                btn.className = 'cyber-button';
                btn.textContent = '✓ Completar Día';
                btn.onclick = () => this.completeDay(programId, currentPhase.day - 1);
                output.appendChild(btn);
                output.scrollTop = output.scrollHeight;
            }, delay);
        }
    }

    completeDay(programId, day) {
        window.WellnessCore.programs.completeDay(programId, day);
        window.WellnessCore.user.addExperience(30);
        
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal('✓ ¡Día completado exitosamente!', false, 100);
            window.appendToTerminal('+ 30 XP', false, 400);
            window.appendToTerminal('Sigue así, tu transformación está en proceso...', false, 700);
        }
        
        if (window.updateUserStats) {
            window.updateUserStats();
        }
    }
}

// ============================================
// STATS DASHBOARD
// ============================================

class StatsViewer {
    showDashboard() {
        const userData = window.WellnessCore.data.load();
        const level = window.WellnessCore.user.getLevel();
        const exp = window.WellnessCore.user.getExperience();
        const progress = window.WellnessCore.user.getProgressToNextLevel();
        
        const totalRecipes = userData.recipes.length;
        const favoriteRecipes = userData.recipes.filter(r => r.favorites).length;
        const completedRecipes = userData.recipes.reduce((sum, r) => sum + r.completedCount, 0);
        
        const activePrograms = userData.programs.filter(p => p.status === 'active').length;
        const completedPrograms = userData.programs.filter(p => p.status === 'completed').length;
        
        const content = `
            <h2 style="color: #fff; text-shadow: 0 0 10px #00ff00;">
                📊 TU DASHBOARD DE TRANSFORMACIÓN
            </h2>
            
            <div style="margin: 30px 0;">
                <h3 style="color: #00ff00;">Nivel y Experiencia</h3>
                <div style="color: #FFD700; font-size: 1.2em;">
                    <strong>NIVEL ${level}</strong><br>
                    ${exp} XP (${progress.toFixed(1)}% al siguiente nivel)
                </div>
                <div style="margin: 10px 0; background: rgba(0, 255, 0, 0.1); height: 15px; border: 1px solid #00ff00; border-radius: 8px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #00ff00, #FFD700); height: 100%; width: ${progress}%;"></div>
                </div>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: #00ff00;">Recetas</h3>
                <div style="color: #FFD700;">
                    <strong>Total:</strong> ${totalRecipes} recetas<br>
                    <strong>Favoritas:</strong> ${favoriteRecipes}<br>
                    <strong>Completadas:</strong> ${completedRecipes} veces
                </div>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: #00ff00;">Programas</h3>
                <div style="color: #FFD700;">
                    <strong>Activos:</strong> ${activePrograms}<br>
                    <strong>Completados:</strong> ${completedPrograms}
                </div>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: #00ff00;">Progreso en Áreas</h3>
                <div style="color: #FFD700;">
                    ${Object.keys(userData.progress).map(key => `
                        <div style="margin: 10px 0;">
                            <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${userData.progress[key].toFixed(1)}%
                            <div style="background: rgba(0, 255, 0, 0.1); height: 8px; border: 1px solid #00ff00; border-radius: 4px; overflow: hidden; margin-top: 5px;">
                                <div style="background: #00ff00; height: 100%; width: ${userData.progress[key]}%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: #00ff00;">Historial de Chat</h3>
                <div style="color: #FFD700;">
                    <strong>${userData.chatHistory.length}</strong> conversaciones con Morpheus
                </div>
            </div>

            <button class="cyber-button" onclick="WellnessUI.stats.exportData()">
                💾 Exportar Datos
            </button>
        `;

        window.WellnessUI.modal.show(content);
    }

    exportData() {
        const data = window.WellnessCore.data.load();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `aurum-wellness-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        if (window.appendToTerminal) {
            window.appendToTerminal('', false, 0);
            window.appendToTerminal('✓ Datos exportados exitosamente', false, 100);
        }
    }
}

// ============================================
// INITIALIZE UI SYSTEMS
// ============================================

window.WellnessUI = {
    modal: new ModalSystem(),
    recipe: new RecipeViewer(),
    program: new ProgramViewer(),
    stats: new StatsViewer()
};

console.log('🎨 Aurum Wellness UI v2.0 - CARGADO');
