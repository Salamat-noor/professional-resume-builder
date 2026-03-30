async function findModels() {
  console.log("Contacting OpenRouter...");
  const res = await fetch("https://openrouter.ai/api/v1/models");
  const data = await res.json();

  const freeModels = data.data.filter(m => m.id.endsWith(":free"));

  const safeModels = freeModels.filter(m => {
    const id = m.id.toLowerCase();
    
    // Block thinking models
    if (id.includes("r1") || id.includes("reasoning") || id.includes("qwen3")) return false; 
    if (id.includes("tool") || id.includes("base")) return false; 
    if (id.includes("gemma-3-4b") || id.includes("lfm")) return false;

    // Require Instruct/Chat
    if (!id.includes("instruct") && !id.includes("chat")) return false;

    // ✅ LOWERED TO 4096 to catch older, stable 7B models
    // if (m.context_length < 4096) return false;

    return true;
  });

  // Sort by context length and take top 7 to give you options
  const topModels = safeModels.sort((a, b) => b.context_length - a.context_length);

  console.log("\n✅ ALL AVAILABLE INSTRUCT MODELS (Copy the ones you want):\n");
  console.log("const MODEL_FALLBACKS = [");
  topModels.forEach(m => {
    console.log(`  "${m.id}", // Context: ${m.context_length}`);
  });
  console.log("];\n");
}

findModels().catch(err => console.error("Failed to fetch:", err));