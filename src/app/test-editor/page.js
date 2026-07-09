'use client';

import CodeRunner from '@/components/CodeRunner';

export default function TestEditorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-6">Тест на редактора</h1>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Python</h2>
        <CodeRunner
          language="python"
          starterCode={'print("Zdravei ot CodeFast!")\nfor i in range(3):\n    print("Ред", i)'}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">JavaScript</h2>
        <CodeRunner
          language="javascript"
          starterCode={'console.log("Zdravei ot JS!");\nfor (let i = 0; i < 3; i++) {\n  console.log("Ред " + i);\n}'}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">C++</h2>
        <CodeRunner
          language="cpp"
          height={260}
          starterCode={'#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Zdravei ot C++!" << endl;\n  return 0;\n}'}
        />
      </div>
    </div>
  );
}