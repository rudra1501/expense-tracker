// import { useState } from "react";

// function Filters({ onFilter }) {
//     const [filters, setFilters] = useState({
//         type: "expense",
//         category: "",
//         startDate: "",
//         endDate: ""
//     });

//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         onFilter(filters);
//     }

//     return(
//         <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//             <select 
//             value={filters.type}
//             onChange={(e)=> setFilters({ ...filters, type: e.target.value })}
//             >
//             <option value="expense">Expense</option>
//             <option value="income">Income</option>
//             </select>

//             <input 
//             type="text"
//             placeholder="Category/Source"
//             value={filters.category}
//             onChange={(e)=> setFilters({ ...filters, category: e.target.value })}
//             />

//             <input 
//             type="date" 
//             value={filters.startDate}
//             onChange={(e)=> setFilters({ ...filters, startDate: e.target.value })}
//             />

//             <input 
//             type="date" 
//             value={filters.endDate}
//             onChange={(e)=> setFilters({ ...filters, endDate: e.target.value })}
//             />

//             <button type="submit">Apply</button>
//         </form>
//     )
// }

// export default Filters;
import { useState } from "react";

function Filters({ onFilter }) {
  const [filters, setFilters] = useState({
    type: "expense",
    category: "",
    startDate: "",
    endDate: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f9f9f9",
        marginBottom: "20px",
        display: "grid",
        gap: "10px",
        maxWidth: "400px"
      }}
    >
      <h3 style={{ margin: "0 0 10px" }}>Apply Filters</h3>
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        placeholder="Category/Source"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Apply
      </button>
    </form>
  );
}

export default Filters;
