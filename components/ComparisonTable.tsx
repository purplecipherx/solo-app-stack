export function ComparisonTable({headers, rows}: {headers: string[]; rows: string[][]}) {
  return (
    <div className="overflow-x-auto rounded-md border border-[var(--line)] bg-[var(--card)]">
      <table className="w-full min-w-[620px] border-collapse text-sm">
        <thead className="bg-[#efe8da]">
          <tr>{headers.map((header) => <th key={header} className="p-3 text-left font-black text-[var(--ink)]">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="border-t border-[var(--line)]">
              {row.map((cell) => <td key={cell} className="p-3 leading-6">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
