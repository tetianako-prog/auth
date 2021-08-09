// <ul>
//   {contacts.length === 0 ? (
//     <h3>You have no contacts yet</h3>
//   ) : (
//     contacts.map((item) => (
//       <li key={item.email}>
//         <ul className={styles.nestedList}>
//           <li>{item.favorite && "favorite"}</li>
//           <li>name: {item.name}</li>
//           <li>email: {item.email}</li>
//           <li>phone: {item.phone}</li>
//           <li>
//             <button type="button" onClick={() => removeContact(item._id)}>
//               Delete
//             </button>
//           </li>
//         </ul>
//       </li>
//     ))
//   )}
// </ul>
