export default function Airdrop() {
    return (
        <div>
            <form id="airdrop_form">
                <input name="address" />
                <input name="amount" type="amount" />
                <button type="submit">airdrop</button>
            </form>
        </div>
    );
}
